import {GetterTree} from 'vuex';
import {Card, Government, Player, StandaloneState} from './types';
import {RootState} from '../../types';
import {getField} from 'vuex-map-fields';

export const getters: GetterTree<StandaloneState, RootState> = {
  getField,

  gameState(state): object {
    const { playerCount, status, view } = state;

    return {
      playerCount,
      status,
      view,
    };
  },

  allPlayers(state): Player[] {
    const { playerCount, players } = state;

    return players.filter((player: Player) => player.id < playerCount);
  },

  alivePlayers(state, getter): Player[] {
    const { playerCount, players } = state;

    return getter.allPlayers.filter((player: Player) => !player.dead);
  },

  eligibleChancellors(state, getter): Player[] {
    const { playerCount, game: { president } } = state;
    const players = getter.alivePlayers;
    const lastGovernment = getter.lastGovernment;

    if (president === null) return [];

    return players.filter((player: Player) => {
      if (player.id === president!.id) return false;
      if (lastGovernment) {
        if (player.id === lastGovernment.chancellor!.id) return false;
        if (players.length > 5
          && player.id === lastGovernment.president!.id) return false;
      }

      return true;
    });
  },

  government(state): Government | boolean {
    const { game: { president, chancellor } } = state;

    if (president === null || chancellor === null) return false;

    return { president, chancellor };
  },

  lastGovernment(state): Government | boolean {
    const { lastGovernment } = state.game;

    if (lastGovernment.president === null) return false;

    return lastGovernment;
  },

  drawnPolicies(state): Card[] {
    const { drawnPolicies } = state.game;

    return drawnPolicies;
  },

  hasVeto(state): boolean {
    const { fascistPolicies } = state.game;

    return fascistPolicies.length >= 5;
  },

  failedElections(state): number {
    return state.game.failedElections;
  },
};
