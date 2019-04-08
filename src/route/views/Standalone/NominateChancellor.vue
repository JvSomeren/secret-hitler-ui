<template>
  <div class="main">
    <ShHeaderLogo />

    <section class="main">
      <template v-if="state === NominateChancellorState.PASS_DEVICE">
        <div class="sh-player__header">
          <h3 class="sh-helper-top">Pass the device to</h3>
          <h1 class="sh-player--name">{{ presidentName }}</h1>
        </div>

        <ShButton
          class="sh-bottom"
          @click.native="state = NominateChancellorState.CHOOSING_CHANCELLOR">Ok!</ShButton>
      </template>

      <template v-else-if="state === NominateChancellorState.CHOOSING_CHANCELLOR">
        <h2>NOMINATE YOUR CHANCELLOR</h2>

        <div class="sh-scrollable-vert ">
          <div class="sh-player-grid">
            <ShButton
              v-for="player in eligibleChancellors"
              :key="player.id"
              @click.native="_click(player)">
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
import {GameStatus, Player} from '@/state/modules/Standalone/types';
import {standaloneMutations} from '@/state/modules/Standalone/mutations';

const standalone = namespace('standalone');

enum NominateChancellorState {
  PASS_DEVICE,
  CHOOSING_CHANCELLOR,
}

@Component({})
export default class NominateChancellor extends Vue {
  @standalone.State((state) => state.game.president)
  private president!: Player;

  @standalone.Getter('eligibleChancellors')
  private eligibleChancellors!: Player[];

  @standalone.Mutation(standaloneMutations.setChancellor)
  private setChancellor!: any;

  @standalone.Action('navigate')
  private navigate!: any;

  private NominateChancellorState = NominateChancellorState;

  private state = NominateChancellorState.PASS_DEVICE;

  get presidentName() {
    if (this.president !== null) return this.president.name;

    return '';
  }

  private _click(player: Player) {
    this.setChancellor(player);
    this.navigate({
      routeName: 'standalone:voteOnGovernment',
      status: GameStatus.VOTING_ON_GOVERNMENT,
    });
  }
}
</script>

<style scoped lang="scss">
  h2 {
    text-align: center;
  }

  .sh-helper-top {
    margin-top: 10px;
  }

  .sh-player__header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-height: 120px;
    padding: 12px;
    box-sizing: border-box;

    text-align: center;
    text-transform: uppercase;

    .sh-player--name {
      text-transform: initial;
    }
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