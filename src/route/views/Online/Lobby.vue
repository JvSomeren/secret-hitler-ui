<template>
  <div>
    <ShHeaderLogo />

    <section class="main">
      <h2>LOBBY</h2>
      <div class="sh-player-list" ref="playerContainer">
        <span
          v-if="showScrollHint"
          class="sh-scroll-hint">< scroll</span>

        <div
          v-for="player in players"
          :key="player.id"
        >{{ player.name }}</div>
      </div>

      <ShButton
        v-if="isHost"
        class="sh-bottom"
        :disabled="disabled"
        @click.native="startRound">Go!</ShButton>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {OnlinePlayer} from '@/state/modules/Online/types';

const online = namespace('online');

@Component({})
export default class Lobby extends Vue {
  @online.State('players')
  private players!: OnlinePlayer[];

  @online.State((state) => state.user.isHost)
  private isHost!: boolean;

  private showScrollHint = false;

  private disabled = true;

  private startRound() {
    //
  }

  private computeShowScrollHint() {
    const container = this.$refs.playerContainer as HTMLDivElement;

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
  .sh-scroll-hint {
    position: absolute;
    right: -15px;
    top: calc(50%);

    transform: rotate(-90deg);
    text-transform: uppercase;
  }

  .sh-player-list {
    align-self: stretch;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-y: auto;
    margin-bottom: 8px;
  }
</style>
