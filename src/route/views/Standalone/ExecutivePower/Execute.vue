<template>
  <div>
    <ShHeaderLogo />

    <section class="main">
      <template v-if="state === ExecuteState.PASS_DEVICE">
        <PassDevice
          :player="president"
          @passed="_passed" />
      </template>

      <template v-else>
        <h2>CHOOSE WHICH PLAYER TO EXECUTE</h2>

        <div class="sh-scrollable-vert ">
          <div class="sh-player-grid">
            <ShButton
              v-for="player in executablePlayers"
              :key="player.id"
              :disabled="disabled"
              @click.native="_execute(player)">
              {{ player.name }}
            </ShButton>
          </div>
        </div>
      </template>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import PassDevice from '@/components/PassDevice.vue';
import {Player} from '@/state/modules/Standalone/types';

const standalone = namespace('standalone');

enum ExecuteState {
  PASS_DEVICE,
  EXECUTING,
}

@Component({
  components: {
    PassDevice,
  },
})
export default class Execute extends Vue {
  @standalone.State((state) => state.game.lastGovernment.president)
  private president!: Player;

  @standalone.Getter('alivePlayers')
  private alivePlayers!: Player[];

  @standalone.Action('execute')
  private execute!: any;

  private ExecuteState = ExecuteState;

  private disabled = true;
  private state = ExecuteState.PASS_DEVICE;

  get executablePlayers() {
    return this.alivePlayers.filter((player) => player.id !== this.president.id);
  }

  private _passed() {
    setTimeout(() => {
      this.disabled = false;
    }, 2000);
    this.state = ExecuteState.EXECUTING;
  }

  private _execute(player: Player) {
    if (this.disabled) return;

    this.execute(player);
  }
}
</script>

<style scoped lang="scss">
  h2 {
    text-align: center;
  }

  .sh-player-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    padding: 0 6px 0 6px;
  }
</style>