import {Module} from 'vuex';
import {OnlineState} from '@/state/modules/Online/types';
import {RootState} from '@/state/types';
import {actions} from './actions';
import {getters} from './getters';
import {mutations} from './mutations';
import {GameStatus} from '@/state/modules/Standalone/types';

export const state = (): OnlineState => {
  return {
    status: GameStatus.STOPPED,
    view: 'standalone:playerCount',
    game: {
      drawPile: [],
      discardPile: [],
      drawnPolicies: [],
      liberalPolicies: [],
      fascistPolicies: [],
      president: null,
      chancellor: null,
      lastGovernment: {
        president: null,
        chancellor: null,
      },
      failedElections: 0,
      nextPresident: null,
      endResult: null,
    },
    playerCount: 0,
    players: [],
  };
};

const namespaced: boolean = true;

export const online: Module<OnlineState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
