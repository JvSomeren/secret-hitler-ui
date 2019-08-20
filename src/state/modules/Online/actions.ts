import Vue from 'vue';
import {ActionTree} from 'vuex';
import {OnlineEvents, OnlinePlayer, OnlineState} from '@/state/modules/Online/types';
import {RootState} from '@/state/types';
import {onlineMutations} from '@/state/modules/Online/mutations';
import $peer from '@/utils/peerjs-instance';
import {GameStatus} from '@/state/modules/Online/types';
import router from '@/route';
import {Dictionary} from 'vue-router/types/router';
import {online} from '@/state/modules/Online/index';
import {
  Card,
  liberalFascistDistribution,
  PartyMembership,
  Policy,
  Role,
  SecretRole,
} from '@/state/modules/Standalone/types';
import shuffle from '@/utils/shuffle';

const createDrawDeck = (libCardCount: number = 6, fasCardCount: number = 11) => {
  const totalCards = libCardCount + fasCardCount;
  const deck = [];

  for (let i = 0; i < totalCards; i++) {
    deck.push({
      id: i,
      policy: i < libCardCount ? Policy.Liberal : Policy.Fascist,
    } as Card);
  }

  return shuffle(deck);
};

const createPlayerRolesArray = (distribution: {[index: number]: number}) => {
  const roles: Role[] = [];

  for (const key of Object.keys(distribution)) {
    const roleIndex = Number(key);
    let role: Role;

    if (roleIndex === SecretRole.Liberal) {
      role = {secretRole: SecretRole.Liberal, partyMembership: PartyMembership.Liberal};
    } else if (roleIndex === SecretRole.Fascist) {
      role = {secretRole: SecretRole.Fascist, partyMembership: PartyMembership.Fascist};
    } else {
      role = {secretRole: SecretRole.Hitler, partyMembership: PartyMembership.Fascist};
    }

    for (let i = 0; i < distribution[roleIndex]; i++) roles.push(role);
  }

  return shuffle(roles);
};

const defaultOnlinePlayer = {
  id: 0,
  name: '',
  role: null,
  president: false,
  chancellor: false,
  dead: false,
  peer: null,
  isHost: false,
};

export const actions: ActionTree<OnlineState, RootState> = {
  init({commit, dispatch}) {
    return new Promise((resolve) => {
      resolve({
        watchers: [
          [
            (state: any, getters: any) => getters['online/drawnPolicies'],
            (arr: any) => dispatch('enactPolicyHandler', arr),
          ],
          [
            (state: any, getters: any) => getters['online/failedElections'],
            (failedElections: number) => dispatch('failedElectionsHandler', failedElections),
          ],
        ],
      });
    });
  },

  navigate({commit}, {routeName, status = null, params = null}:
    {routeName: string, status: GameStatus | null, params: Dictionary<string> | null}) {
    if (status !== null) commit(onlineMutations.updateStatus, status);
    commit(onlineMutations.updateView, routeName);
    if (params === null) router.push({name: routeName});
    else router.push({name: routeName, params});
  },

  createLobby({state, commit, dispatch}) {
    fetch(`${process.env.VUE_APP_API_ENDPOINT}/new`)
      .then((response) => {
        if (response.status !== 200) throw new Error(response.statusText);

        return response.json();
      }).then((lobby) => {
        commit(onlineMutations.setLobbyId, lobby.id);
        commit(onlineMutations.setHost);
        dispatch('setUserPlayer');
        commit(onlineMutations.addPlayer, state.user.player);
        dispatch('registerPeerAsHost');

        dispatch('navigate', {
          routeName: 'online:lobby',
          status: GameStatus.LOBBY,
          params: { id: lobby.id },
        });
      }).catch((error) => {
        console.error(error);
      });
  },

  registerPeerAsHost({state}) {
    const lobbyId = state.lobbyId;
    const peerId = $peer.id;

    return fetch(`${process.env.VUE_APP_API_ENDPOINT}/${lobbyId}/sethost/${peerId}`, {
      method: 'POST',
    }).then((response) => {
      if (response.status !== 200) throw new Error(response.statusText);

      return response.json();
    }).then((response) => {
      if (response.hasOwnProperty('status')) throw new Error(response.message);

    }).catch((error) => {
      console.error(error);
    });
  },

  connectToLobby({state, commit, dispatch}, lobbyId) {
    return fetch(`${process.env.VUE_APP_API_ENDPOINT}/${lobbyId}`)
      .then((response) => {
        if (response.status !== 200) throw new Error(response.statusText);

        return response.json();
      }).then((response) => {
        if (response.hasOwnProperty('status')) throw new Error(response.message);

        commit(onlineMutations.setLobbyId, lobbyId);
        commit(onlineMutations.setHost, false);
        dispatch('setUserPlayer');
        dispatch('connectToHostPeer', response.host);

        dispatch('navigate', {
          routeName: 'online:lobby',
          status: GameStatus.LOBBY,
          params: { id: lobbyId },
        });
        return true;
      }).catch((error) => {
        console.error(error);
        return false;
      });
  },

  connectToHostPeer({state}, hostPeerId) {
    const { name } = state.user;

    $peer.connect(hostPeerId, {
      serialization: 'json',
      metadata: {
        name,
      },
    });
  },

  setUserPlayer({ state, commit }) {
    const { name, isHost } = state.user;

    if (state.user.player === null) {
      commit(onlineMutations.setUserPlayer, {
        ...defaultOnlinePlayer,
        id: state.players.length,
        name,
        isHost,
      });
    } else {
      commit(onlineMutations.updateUserPlayer, {
        name,
        isHost,
      });
    }
  },

  // shuffle draw deck (11 facist, 6 liberal) and reset discard deck
  startRound({state, commit, dispatch}) {
    commit(onlineMutations.updateStatus, GameStatus.INITIALIZING);

    commit(onlineMutations.updateDrawDeck, createDrawDeck());
    commit(onlineMutations.updateDiscardDeck, []);

    // set player roles
    commit(onlineMutations.assignPlayerRoles,
      createPlayerRolesArray(liberalFascistDistribution[state.players.length]));

    const navigateObject = {
      routeName: 'online:showRole',
      status: GameStatus.SHOWING_ROLES,
    };

    // @TODO send specific role to specific user

    dispatch('sendToAllPeers', {
      event: OnlineEvents.UPDATE_VIEW,
      data: navigateObject,
    });
    dispatch('navigate', navigateObject);
  },

  sendToAllPeers({ state }, data) {
    const { players } = state;

    for (const player of players) {
      if (player.peer === null) continue;
      if (typeof $peer.connections[player.peer] === 'undefined') continue;

      const connection = $peer.connections[player.peer].find((con: any) => con.open);

      if (typeof connection === 'undefined') continue;

      connection.send(data);
    }
  },

  data_data({ commit, dispatch }, { args, dataConnection }) {
    const [ data ] = args;

    switch (data.event) {
      case OnlineEvents.UPDATE_VIEW:
        dispatch('navigate', {
          data,
        });
        break;
      case OnlineEvents.UPDATE_PLAYER_NAME:
        break;
      case OnlineEvents.UPDATE_PLAYERS:
        commit(onlineMutations.setPlayers, data.players);
        break;
      default:
        const { event, ...payload } = data;
        console.error('Unknown event', event, payload);
        break;
    }
  },

  peer_connection({ state, commit, dispatch }, { args }) {
    const [ dataConnection ] = args;
    const { players } = state;

    // check if player is already registered

    commit(onlineMutations.addPlayer, {
      ...defaultOnlinePlayer,
      id: state.players.length,
      name: dataConnection.metadata.name,
      peer: dataConnection.peer,
      send: dataConnection.send,
    });

    const data = {
      event: OnlineEvents.UPDATE_PLAYERS,
      players,
    };

    dataConnection.on('open', () => {
      dataConnection.send(data);
    });

    dispatch('sendToAllPeers', data);

    // for (const player of players) {
    //   if (player.peer === null) continue;
    //   if (player.peer === dataConnection.peer) continue;
    //   if (typeof $peer.connections[player.peer] === 'undefined') continue;
    //
    //   const connection = $peer.connections[player.peer].find((con: any) => con.open);
    //
    //   if (typeof connection === 'undefined') continue;
    //
    //   connection.send(data);
    // }
  },
};
