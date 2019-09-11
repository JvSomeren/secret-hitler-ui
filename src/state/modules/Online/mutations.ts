import {MutationTree} from 'vuex';
import {OnlinePlayer, OnlineState} from '@/state/modules/Online/types';
import {state as initialState} from './index';
import {updateField} from 'vuex-map-fields';
import {Card, GameStatus, Role} from '@/state/modules/Standalone/types';

export const onlineMutations = {
  peerOpen: `PEER_OPEN`,
  resetState: `RESET_STATE`,
  updateStatus: `UPDATE_STATUS`,
  updateView: `UPDATE_VIEW`,
  setLobbyId: `SET_LOBBY_ID`,
  setHost: `SET_HOST`,
  setUserPlayer: `SET_USER_PLAYER`,
  updateUserPlayer: `UPDATE_USER_PLAYER`,
  addPlayer: `ADD_PLAYER`,
  updatePlayer: `UPDATE_PLAYER`,
  setPlayers: `SET_PLAYERS`,
  updateDrawDeck: `UPDATE_DRAW_DECK`,
  updateDiscardDeck: `UPDATE_DISCARD_DECK`,
  assignPlayerRoles: `ASSIGN_PLAYER_ROLES`,
  setPresident: `SET_PRESIDENT`,
  setChancellor: `SET_CHANCELLOR`,
  resetFailedElectionsTracker: `RESET_FAILED_ELECTIONS_TRAKCER`,
  increaseFailedElectionsTracker: `INCREASE_FAILED_ELECTIONS_TRACKER`,
  drawCards: `DRAW_CARDS`,
  discardCard: `DISCARD_CARD`,
  discardDrawnCards: `DISCARD_DRAWN_CARDS`,
  enactPolicy: `ENACT_POLICY`,
  emptyDrawnCards: `EMPTY_DRAWN_CARDS`,
  setLastGovernment: `SET_LAST_GOVERNMENT`,
  executePlayer: `EXECUTE_PLAYER`,
  setNextPresident: `SET_NEXT_PRESIDENT`,
  setGameEnd: `SET_GAME_END`,
};

export const mutations: MutationTree<OnlineState> = {
  updateField,

  [onlineMutations.peerOpen](state, { args }) {
    const [id] = args;
    state.user.peerId = id;
  },

  [onlineMutations.resetState](state) {
    const {user, ...newState} = initialState();
    Object.assign(state, newState);
  },

  [onlineMutations.updateStatus](state, status: GameStatus) {
    state.status = status;
  },

  [onlineMutations.updateView](state, view: string) {
    state.view = view;
  },

  [onlineMutations.setLobbyId](state, lobbyId: string) {
    state.lobbyId = lobbyId;
  },

  [onlineMutations.setHost](state, isHost: boolean = true) {
    state.user.isHost = isHost;
  },

  [onlineMutations.setUserPlayer](state, player: OnlinePlayer) {
    state.user.player = player;
  },

  [onlineMutations.updateUserPlayer](state, payload: { name: string, isHost: boolean }) {
    Object.assign(state.user.player, payload);
  },

  [onlineMutations.addPlayer](state, player: OnlinePlayer) {
    state.players.push(player);
  },

  [onlineMutations.updatePlayer](state, player: OnlinePlayer) {
    state.players[player.id] = player;
  },

  [onlineMutations.setPlayers](state, players: OnlinePlayer[]) {
    state.players = players;
  },

  [onlineMutations.updateDrawDeck](state, deck: Card[]) {
    state.game.drawPile = deck;
  },

  [onlineMutations.updateDiscardDeck](state, deck: Card[]) {
    state.game.discardPile = deck;
  },

  [onlineMutations.assignPlayerRoles](state, roles: Role[]) {
    state.players.map((player, index) => player.role = roles[index]);
  },
};
