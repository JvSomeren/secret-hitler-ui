<template>
  <div>
    <ShHeaderLogo />

    <section class="main">
      <template v-if="state === SpecialElectionState.PASS_DEVICE">
        <PassDevice
          :player="president"
          @passed="_passed" />
      </template>

      <template v-else>
        <h2>CHOOSE THE NEXT PRESIDENT</h2>

        <div class="sh-scrollable-vert ">
          <div class="sh-player-grid">
            <ShButton
              v-for="player in players"
              :key="player.id"
              :disabled="disabled"
              @click.native="_pick(player)">
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
import {GameStatus, Player} from '@/state/modules/Standalone/types';

const standalone = namespace('standalone');

enum SpecialElectionState {
  PASS_DEVICE,
  PEEKING,
}

@Component({
  components: {
    PassDevice,
  },
})
export default class SpecialElection extends Vue {
  @standalone.State((state) => state.game.lastGovernment.president)
  private president!: Player;

  @standalone.Getter('alivePlayers')
  private alivePlayers!: Player[];

  @standalone.Action('specialElection')
  private specialElection!: any;

  @standalone.Action('navigate')
  private navigate!: any;

  private SpecialElectionState = SpecialElectionState;

  private disabled = true;
  private state = SpecialElectionState.PASS_DEVICE;

  get players() {
    return this.alivePlayers.filter((player) => player.id !== this.president.id);
  }

  private _passed() {
    setTimeout(() => {
      this.disabled = false;
    }, 1000);
    this.state = SpecialElectionState.PEEKING;
  }

  private _pick(player: Player) {
    if (this.disabled) return;

    this.specialElection(player);

    this.navigate({
      routeName: 'standalone:nominateChancellor',
      status: GameStatus.NOMINATING_CHANCELLOR,
    });
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