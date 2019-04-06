import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

// import modules from './modules';
import {standalone} from './modules/Standalone';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  strictMode: true,
  storage: window.localStorage,
});

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    isOnline: true,
    version: '0.1.0',
  },
  mutations: {
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION,
    GO_ONLINE: (state) => state.isOnline = true,
    GO_OFFLINE: (state) => state.isOnline = false,
  },
  modules: {
    standalone,
  },
  actions: {
    init() {
      ['standalone'].forEach((module) => {
        store.dispatch(`${module}/init`)
          .then((response) => {
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
  plugins: [ vuexLocal.plugin ],
});

store.dispatch('init');

export default store;
