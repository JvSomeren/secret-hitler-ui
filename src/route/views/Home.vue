<template>
  <div class="root-container">
    <ShHeaderLogo />

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
</style>
