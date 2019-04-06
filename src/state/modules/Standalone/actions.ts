import {ActionTree} from 'vuex';
import {
  Card,
  GameStatus,
  liberalFascistDistribution,
  PartyMembership, Player,
  Policy,
  Role,
  SecretRole,
  StandaloneState,
} from './types';
import {RootState} from '../../types';
import {standaloneMutations} from '@/state/modules/Standalone/mutations';
import router from '@/route';
import shuffle from 'lodash/shuffle';

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

export const actions: ActionTree<StandaloneState, RootState> = {
  init({commit, dispatch}) {
    return new Promise((resolve) => {
      resolve({
        watchers: [
          [
            (state: any, getters: any) => getters['standalone/drawnPolicies'],
            (arr: any) => dispatch('enactPolicy', arr),
          ],
        ],
      });
    });
  },

  navigate({commit}, {routeName, status = null}: {routeName: string, status: GameStatus | null}) {
    if (status !== null) commit(standaloneMutations.updateStatus, status);
    commit(standaloneMutations.updateView, routeName);
    router.push({name: routeName});
  },

  initRound({state, commit, dispatch}) {
    commit(standaloneMutations.updateStatus, GameStatus.INITIALIZING);

    // set missing player names
    for (let i = 0; i < state.playerCount; i++) {
      const player = state.players[i];

      if (player.name === '') {
        commit(standaloneMutations.updatePlayerName, {
          playerId: player.id,
          name: `Player ${player.id + 1}`,
        });
      }
    }
    // shuffle draw deck (11 facist, 6 liberal) and reset discard deck
    commit(standaloneMutations.updateDrawDeck, createDrawDeck());
    commit(standaloneMutations.updateDiscardDeck, []);

    // set player roles
    commit(standaloneMutations.assignPlayerRoles,
      createPlayerRolesArray(liberalFascistDistribution[state.playerCount]));

    // navigate to show roles view
    dispatch('navigate', {
      routeName: 'standalone:showRoles',
      status: GameStatus.SHOWING_ROLES,
    });
  },

  governmentVotePassed({state, commit, dispatch}) {
    // 3 or more fascist policies? is chancellor hitler
    if (state.game.fascistPolicies >= 3
      && state.game.chancellor!.role!.secretRole === SecretRole.Hitler) {
      console.warn('Chnacellor is Hitler'); // @TODO game end

      return;
    }

    commit(standaloneMutations.resetFailedElectionsTracker);
    dispatch('navigate', {
      routeName: 'standalone:presidentDiscardPolicy',
      status: GameStatus.PRESIDENT_DISCARDING_POLICY,
    });
  },

  governmentVoteFailed({state, commit, dispatch}) {
    // increase failed election tracker separate function
    commit(standaloneMutations.increaseFailedElectionsTracker);
    // 3 failed elections?
    if (state.game.failedElections === 3) {
      console.warn('reveal top policy card'); // @TODO election tracker
      commit(standaloneMutations.resetFailedElectionsTracker);
    }
    // move presidency
    dispatch('passPresidency');
    // navigate to nominateChancelor
    dispatch('navigate', {
      routeName: 'standalone:nominateChancellor',
      status: GameStatus.NOMINATING_CHANCELLOR,
    });
  },

  passPresidency({commit, dispatch, getters}) {
    const players = getters.alivePlayers;
    const government = getters.government;

    const presidentIndex = players.findIndex((player: Player) => player.id === government.president.id);
    const nextPresident = players[(presidentIndex + 1) % players.length];

    commit(standaloneMutations.setChancellor, null);
    commit(standaloneMutations.setPresident, nextPresident);
  },

  drawCards({state, commit}, count: number = 3) {
    if (state.game.drawnPolicies.length) return;

    commit(standaloneMutations.drawCards, count);
  },
};
