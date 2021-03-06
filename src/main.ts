import Vue from 'vue';
import App from './App.vue';
import router from './route';
import store from './state';
import '@/components/_globals';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
