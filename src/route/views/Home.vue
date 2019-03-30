<template>
  <div class="root-container">
    <section class="header header-logo">
      <LogoVertical class="logo" />
    </section>

    <router-view class="main"></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LogoVertical from '@/assets/logo-vertical.svg';

@Component({
  components: {
    LogoVertical,
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.logo {
  height: 100px;

  #letters {
    fill: #F2654B;
  }
}
</style>
