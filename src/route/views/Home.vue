<template>
  <div class="root-container">
    <ShHeaderLogo />

    <router-view class="main"></router-view>

    <span class="sh-version">v{{ version }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LogoVertical from '@/assets/logo-vertical.svg';
import {State} from 'vuex-class';

@Component({
  components: {
    LogoVertical,
  },
})
export default class Home extends Vue {
  private version = process.env.VUE_APP_VERSION;
}
</script>

<style scoped lang="scss">
  .sh-version {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
    padding: 0 2px 0 0;

    font-family: 'Courier', Courier, monospace;
    font-size: 14px;
    font-weight: bold;
    color: #434343;
  }
</style>
