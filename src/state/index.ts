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
  plugins: [ vuexLocal.plugin ],
});

store.dispatch('standalone/init');

export default store;
