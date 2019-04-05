import {GetterTree} from 'vuex';
import {Player, StandaloneState} from './types';
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
};
