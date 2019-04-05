<template>
  <main id="app">
    <ShSnackbar
      v-if="updateExists"
      text="New version available!"
      bottom right>
      <span
        @click="refreshApp">Refresh</span>
    </ShSnackbar>

    <router-view />
  </main>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';
import {Mutation} from 'vuex-class';

@Component
export default class App extends Vue {
  @Mutation('GO_ONLINE')
  private goOnline!: any;

  @Mutation('GO_OFFLINE')
  private goOffline!: any;

  private updateExists = false;
  private refreshing = false;
  private registration: ServiceWorkerRegistration | null = null;

  private handleNetworkChange(e: any) {
    if (navigator.onLine) this.goOnline();
    else this.goOffline();
  }

  private showUpdateExists(e: any) {
    this.registration = e.detail;
    this.updateExists = true;
  }

  private refreshApp() {
    this.updateExists = false;

    if (!this.registration || !this.registration.waiting) return;

    this.registration.waiting.postMessage('skipWaiting');
  }

  private created() {
    window.addEventListener('online', this.handleNetworkChange);
    window.addEventListener('offline', this.handleNetworkChange);

    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener('swUpdated', this.showUpdateExists, { once: true });

    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  }

  private beforeDestroy() {
    window.removeEventListener('online', this.handleNetworkChange);
    window.removeEventListener('offline', this.handleNetworkChange);
    document.removeEventListener('swUpdated', this.showUpdateExists);
  }
}
</script>

<style lang="scss">
@import 'normalize-scss';
@include normalize();

* {
  user-select: none;
}

html,
body {
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #FBB969;

  height: 100%;
  display: flex;
}

.root-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  flex: 1;
}

.header-logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main {
  flex: 3;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

h2 {
  font-family: 'Futura', sans-serif;;
  font-weight: 700;
  color: #434343;
  margin-top: 0;
  margin-bottom: 8px;
}

.sh-bottom {
  margin-top: auto;
}
</style>
