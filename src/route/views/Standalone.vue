<template>
  <router-view class="root-container"></router-view>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import LogoVertical from '@/assets/logo-vertical.svg';

@Component({
  components: {
    LogoVertical,
  },
})
export default class Standalone extends Vue {}
</script>

<style scoped lang="scss">
</style>