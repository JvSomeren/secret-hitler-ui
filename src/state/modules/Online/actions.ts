import {ActionTree} from 'vuex';
import {OnlineState} from '@/state/modules/Online/types';
import {RootState} from '@/state/types';

export const actions: ActionTree<OnlineState, RootState> = {
  init({commit, dispatch}) {
    return new Promise((resolve) => {
      resolve({
        watchers: [
          [
            (state: any, getters: any) => getters['online/drawnPolicies'],
            (arr: any) => dispatch('enactPolicyHandler', arr),
          ],
          [
            (state: any, getters: any) => getters['online/failedElections'],
            (failedElections: number) => dispatch('failedElectionsHandler', failedElections),
          ],
        ],
      });
    });
  },
};
