<template>
  <div>
    <section class="header header-logo">
      <LogoVertical class="logo" />
    </section>

    <section class="main sh-lobby-player-names">
      <ShBack />

      <h2>WHO'S PLAYING</h2>
      <div class="sh-player-names-list" ref="playerNamesContainer">
        <span
          v-if="showScrollHint"
          class="sh-scroll-hint">< scroll</span>

        <ShInput
          v-for="n in playerCount"
          :key="n"
          v-model="players[n].name"
          :placeholder="`Player ${n}`"
          @keyup.native.enter="focusNextElement" />
      </div>

      <ShButton class="sh-bottom">Go!</ShButton>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import LogoVertical from '@/assets/logo-vertical.svg';
import {namespace} from 'vuex-class';
import {Player} from '../../../state/modules/Standalone/types';

const standalone = namespace('standalone');

@Component({
  components: {
    LogoVertical,
  },
})
export default class StandalonePlayerNames extends Vue {
  @standalone.State('playerCount')
  private playerCount!: number;

  @standalone.State('players')
  private players!: Player[];

  private showScrollHint = false;
  private test = [{name: ''}];

  private focusNextElement(e: KeyboardEvent) {
    const {nextSibling}: { nextSibling: any | HTMLInputElement } = e.target! as HTMLInputElement;
    if (nextSibling) nextSibling!.focus();
  }

  private computeShowScrollHint() {
    const container = this.$refs.playerNamesContainer as HTMLDivElement;

    this.showScrollHint = container.scrollHeight > container.clientHeight;
  }

  private mounted() {
    window.addEventListener('resize', this.computeShowScrollHint);
    this.computeShowScrollHint();
  }

  private beforeDestroy() {
    window.removeEventListener('resize', this.computeShowScrollHint);
  }
}
</script>

<style scoped lang="scss">
  .header-logo .logo {
    height: 100px;
  }

  .sh-scroll-hint {
    position: absolute;
    right: -15px;
    top: calc(50%);

    transform: rotate(-90deg);
    text-transform: uppercase;
  }

  .sh-player-names-list {
    align-self: stretch;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-y: auto;
    margin-bottom: 8px;
  }

  .main {
    /*justify-content: space-between;*/
  }
</style>
