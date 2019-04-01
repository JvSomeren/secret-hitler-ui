import {GetterTree} from 'vuex';
import {StandaloneState} from './types';
import {RootState} from '../../types';

export const getters: GetterTree<StandaloneState, RootState> = {
  gameState(state): object {
    const { playerCount, status } = state;

    return {
      playerCount,
      status,
    };
  },
};
