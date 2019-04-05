import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

// import modules from './modules';
import {standalone} from './modules/Standalone';
import {RootState} from '@/state/types';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  strictMode: true,
  storage: window.localStorage,
});

export const state = (): RootState => {
  return {
    isOnline: true,
    version: '0.1.0',
  };
};

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations: {
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION,
    GO_ONLINE: (s) => s.isOnline = true,
    GO_OFFLINE: (s) => s.isOnline = false,
  },
  modules: {
    standalone,
  },
  plugins: [ vuexLocal.plugin ],
});

store.dispatch('standalone/init');

export default store;
