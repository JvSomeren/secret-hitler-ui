import {ActionTree} from 'vuex';
import {
  Card,
  GameStatus,
  liberalFascistDistribution,
  PartyMembership,
  Policy,
  Role,
  SecretRole,
  StandaloneState,
} from './types';
import {RootState} from '../../types';
import {standaloneMutations} from '@/state/modules/Standalone/mutations';
import router from '@/route';
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

export const actions: ActionTree<StandaloneState, RootState> = {
  init() {
    // do things
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
};
