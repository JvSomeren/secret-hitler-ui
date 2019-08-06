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

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    isOnline: true,
    version: '1.0.0',
  },
  mutations: {
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION,
    GO_ONLINE: (state: RootState) => state.isOnline = true,
    GO_OFFLINE: (state: RootState) => state.isOnline = false,
  },
  modules: {
    standalone,
  },
  actions: {
    init() {
      ['standalone'].forEach((module) => {
        store.dispatch(`${module}/init`)
          .then((response: any) => {
            // create watchers
            if (response.hasOwnProperty('watchers')) {
              for (const watcher of response.watchers) {
                const args = watcher as [() => {}, () => {}];
                store.watch(...args);
              }
            }
          });
      });
    },
  },
  plugins: [ vuexLocal.plugin ] as any,
});

store.dispatch('init');

export default store;
