import {GetterTree} from 'vuex';
import {OnlineState} from '@/state/modules/Online/types';
import {RootState} from '@/state/types';
import {getField} from 'vuex-map-fields';

export const getters: GetterTree<OnlineState, RootState> = {
  getField,
};
