import {GetterTree} from 'vuex';
import {StandaloneState} from './types';
import {RootState} from '../../types';
import {getField} from 'vuex-map-fields';

export const getters: GetterTree<StandaloneState, RootState> = {
  getField,

  gameState(state): object {
    const { playerCount, status } = state;

    return {
      playerCount,
      status,
    };
  },
};
