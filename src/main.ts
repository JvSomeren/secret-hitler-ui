import Vue from 'vue';
import App from './App.vue';
import router from './route';
import store from './state';
import '@/components/_globals';
import './registerServiceWorker';
import VuePeerJS from '../../vue-peerjs';
import $peer from '@/utils/peerjs-instance';

Vue.use(VuePeerJS, $peer, {});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
