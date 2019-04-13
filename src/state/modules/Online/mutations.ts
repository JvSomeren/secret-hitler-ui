import {MutationTree} from 'vuex';
import {OnlineState} from '@/state/modules/Online/types';
import {updateField} from 'vuex-map-fields';

export const mutations: MutationTree<OnlineState> = {
  updateField,
};
