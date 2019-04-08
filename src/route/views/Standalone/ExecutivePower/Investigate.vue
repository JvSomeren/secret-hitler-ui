<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <ShHeaderLogo />

    <section class="main">
      <template v-if="state === InvestigateState.PASS_DEVICE">
        <PassDevice
          :player="president"
          @passed="_passed" />
      </template>

      <template v-else-if="state === InvestigateState.INVESTIGATING">
        <h2>CHOOSE WHICH PLAYER TO INVESTIGATE</h2>

        <div class="sh-scrollable-vert ">
          <div class="sh-player-grid">
            <ShButton
              v-for="player in players"
              :key="player.id"
              :disabled="disabled"
              @click.native="_investigate(player)">
              {{ player.name }}
            </ShButton>
          </div>
        </div>
      </template>

      <template v-else>
        <h3>INVESTIGATING PARTY MEMBERSHIP OF</h3>
        <h1>{{ selectedPlayer.name }}</h1>

        <ShCard
          light
          :liberal="selectedPlayer.role.partyMembership === PartyMembership.Liberal"
          :fascist="selectedPlayer.role.partyMembership === PartyMembership.Fascist"
          :flipped="flipped">
          <template v-slot:default>
            <Decal />
          </template>

          <template v-slot:back>
            <h3>PARTY MEMBERSHIP</h3>
            <Liberal v-if="selectedPlayer.role.partyMembership === PartyMembership.Liberal" />
            <Fascist v-else-if="selectedPlayer.role.partyMembership === PartyMembership.Fascist" />
          </template>
        </ShCard>

        <ShButton
          v-if="!flipped"
          :disabled="disabled"
          @click.native="flipped = true">Reveal party membership</ShButton>
        <ShButton
          v-else
          :disabled="disabled"
          @click.native="_click">I've seen enough</ShButton>
      </template>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import PassDevice from '@/components/PassDevice.vue';
import {Player, PartyMembership, GameStatus} from '@/state/modules/Standalone/types';
import Decal from '@/assets/decal.svg';
import Liberal from '@/assets/liberal.svg';
import Fascist from '@/assets/fascist.svg';
import Hitler from '@/assets/hitler.svg';

const standalone = namespace('standalone');

enum InvestigateState {
  PASS_DEVICE,
  INVESTIGATING,
  VIEWING_MEMBERSHIP,
}

@Component({
  components: {
    PassDevice,
    Decal,
    Liberal,
    Fascist,
    Hitler,
  },
})
export default class Investigate extends Vue {
  @standalone.State((state) => state.game.lastGovernment.president)
  private president!: Player;

  @standalone.Getter('alivePlayers')
  private alivePlayers!: Player[];

  @standalone.Action('navigate')
  private navigate!: any;

  private PartyMembership = PartyMembership;
  private InvestigateState = InvestigateState;

  private disabled = true;
  private flipped = false;
  private state = InvestigateState.PASS_DEVICE;
  private selectedPlayer: Player | null = null;

  get players() {
    return this.alivePlayers.filter((player) => player.id !== this.president.id);
  }

  private _passed() {
    setTimeout(() => {
      this.disabled = false;
    }, 2000);
    this.state = InvestigateState.INVESTIGATING;
  }

  private _investigate(player: Player) {
    if (this.disabled) return;

    this.disabled = true;
    setTimeout(() => {
      this.disabled = false;
    }, 1000);
    this.selectedPlayer = player;
    this.state = InvestigateState.VIEWING_MEMBERSHIP;
  }

  private _click() {
    this.disabled = true;
    this.flipped = false;
    setTimeout(() => {
      this.navigate({
        routeName: 'standalone:nominateChancellor',
        status: GameStatus.NOMINATING_CHANCELLOR,
      });
    }, 400);
  }
}
</script>

<style scoped lang="scss">
  h1,
  h2,
  h3 {
    text-align: center;
  }

  .sh-player-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    align-self: stretch;

    padding: 0 6px 0 6px;
  }

  /deep/ .sh-card {
    .sh-card-back svg {
      height: unset;
      width: calc(70%);
    }

    &.sh-card--active .sh-card-inner {
      transform: rotateY(180deg);
    }
  }
</style>