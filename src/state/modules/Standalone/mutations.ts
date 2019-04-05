import {MutationTree} from 'vuex';
import {Card, GameStatus, Role, StandaloneState} from './types';

import {updateField} from 'vuex-map-fields';

const TYPE_PREFIX = 'STANDALONE';

export const standaloneMutations = {
  updateStatus: `UPDATE_STATUS`,
  updateView: `UPDATE_VIEW`,
  updatePlayerCount: `UPDATE_PLAYER_COUNT`,
  updatePlayerName: `UPDATE_PLAYER_NAME`,
  updateDrawDeck: `UPDATE_DRAW_DECK`,
  updateDiscardDeck: `UPDATE_DISCARD_DECK`,
  assignPlayerRoles: `ASSIGN_PLAYER_ROLES`,
};

export const mutations: MutationTree<StandaloneState> = {
  updateField,

  [standaloneMutations.updateStatus](state, status: GameStatus) {
    state.status = status;
  },

  [standaloneMutations.updateView](state, view: string) {
    state.view = view;
  },

  [standaloneMutations.updatePlayerCount](state, playerCount: number) {
    state.playerCount = playerCount;
  },

  [standaloneMutations.updatePlayerName](state, {playerId, name}: {playerId: number, name: string}) {
    state.players[playerId].name = name;
  },

  [standaloneMutations.updateDrawDeck](state, deck: Card[]) {
    state.game.drawPile = deck;
  },

  [standaloneMutations.updateDiscardDeck](state, deck: Card[]) {
    state.game.discardPile = deck;
  },

  [standaloneMutations.assignPlayerRoles](state, roles: Role[]) {
    state.players.map((player, index) => player.role = roles[index]);
  },
};
