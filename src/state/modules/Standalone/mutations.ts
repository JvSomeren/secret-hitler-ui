import {MutationTree} from 'vuex';
import {Card, GameStatus, Player, Role, StandaloneState} from './types';
import {state as initialState} from './index';

import {updateField} from 'vuex-map-fields';

const TYPE_PREFIX = 'STANDALONE';

export const standaloneMutations = {
  resetState: `RESET_STATE`,
  updateStatus: `UPDATE_STATUS`,
  updateView: `UPDATE_VIEW`,
  updatePlayerCount: `UPDATE_PLAYER_COUNT`,
  updatePlayerName: `UPDATE_PLAYER_NAME`,
  updateDrawDeck: `UPDATE_DRAW_DECK`,
  updateDiscardDeck: `UPDATE_DISCARD_DECK`,
  assignPlayerRoles: `ASSIGN_PLAYER_ROLES`,
  setPresident: `SET_PRESIDENT`,
  setChancellor: `SET_CHANCELLOR`,
  resetFailedElectionsTracker: `RESET_FAILED_ELECTIONS_TRAKCER`,
  increaseFailedElectionsTracker: `INCREASE_FAILED_ELECTIONS_TRACKER`,
};

export const mutations: MutationTree<StandaloneState> = {
  updateField,

  [standaloneMutations.resetState](state) {
    const {playerCount, players, ...newState} = initialState();
    Object.assign(state, newState);
  },

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

  [standaloneMutations.setPresident](state, president: Player) {
    state.game.president = president;
  },

  [standaloneMutations.setChancellor](state, chancellor: Player | null) {
    state.game.chancellor = chancellor;
  },

  [standaloneMutations.resetFailedElectionsTracker](state) {
    state.game.failedElections = 0;
  },

  [standaloneMutations.increaseFailedElectionsTracker](state) {
    state.game.failedElections++;
  },
};
