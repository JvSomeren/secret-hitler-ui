import {MutationTree} from 'vuex';
import {StandaloneState} from './types';

const TYPE_PREFIX = 'STANDALONE';

export const standaloneMutations = {
  updateStatus: `UPDATE_STATUS`,
  updatePlayerCount: `UPDATE_PLAYER_COUNT`,
};

export const mutations: MutationTree<StandaloneState> = {
  [standaloneMutations.updateStatus](state, status: string) {
    state.status = status;
  },

  [standaloneMutations.updatePlayerCount](state, playerCount: number) {
    state.playerCount = playerCount;
  },
};
