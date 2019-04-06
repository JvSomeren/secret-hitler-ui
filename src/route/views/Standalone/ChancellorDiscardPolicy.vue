<template>
  <div>
    <ShBack endPrompt>X Exit</ShBack>
    <section class="main">
      <template v-if="state === ChancellorDiscardPolicyState.PASS_DEVICE">
        <PassDevice
          :player="chancellor"
          @passed="_passed" />
      </template>

      <template v-else>
        <h2>PLEASE SELECT ONE CARD TO DISCARD</h2>
        <ShCard
          v-for="(card, index) in cards"
          :key="card.id"
          light
          :liberal="card.policy === Policy.Liberal"
          :fascist="card.policy === Policy.Fascist"
          :flipped="index === selectedCardIndex"
          @click.native="_click(index)">
          <LogoLiberal v-if="card.policy === Policy.Liberal" />
          <LogoFascist v-else-if="card.policy === Policy.Fascist" />
        </ShCard>

        <ShButton
          class="sh-bottom"
          :disabled="selectedCardIndex === null"
          @click.native="_confirm">Confirm</ShButton>
      </template>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {Card, Player, Policy} from '@/state/modules/Standalone/types';
import PassDevice from '@/components/PassDevice.vue';
import LogoLiberal from '@/assets/logo-liberal.svg';
import LogoFascist from '@/assets/logo-fascist.svg';
import {standaloneMutations} from '@/state/modules/Standalone/mutations';

const standalone = namespace('standalone');

enum ChancellorDiscardPolicyState {
  PASS_DEVICE,
  DISCARDING_POLICY,
}

@Component({
  components: {
    PassDevice,
    LogoLiberal,
    LogoFascist,
  },
})
export default class ChancellorDiscardPolicy extends Vue {
  @standalone.State((state) => state.game.chancellor)
  private chancellor!: Player;

  @standalone.State((state) => state.game.drawnPolicies)
  private cards!: Card[];

  @standalone.Mutation(standaloneMutations.discardCard)
  private discardCard!: any;

  @standalone.Mutation(standaloneMutations.resetFailedElectionsTracker)
  private resetFailedElectionsTracker!: any;

  @standalone.Action('setLastGovernment')
  private setLastGovernment!: any;

  @standalone.Action('passPresidency')
  private passPresidency!: any;

  @standalone.Action('navigate')
  private navigate!: any;

  private ChancellorDiscardPolicyState = ChancellorDiscardPolicyState;
  private Policy = Policy;

  private state = ChancellorDiscardPolicyState.PASS_DEVICE;
  private selectedCardIndex: number | null = null;

  private _passed() {
    this.state = ChancellorDiscardPolicyState.DISCARDING_POLICY;
  }

  private _click(cardIndex: number) {
    this.selectedCardIndex = cardIndex;
  }

  private _veto() {
    // @TODO add veto ability
    // president needs to confirm
    // if confirmed increase failed elections tracker
  }

  private _confirm() {
    this.discardCard(this.selectedCardIndex);
    this.resetFailedElectionsTracker();
    this.setLastGovernment();
    this.passPresidency();
  }
}
</script>

<style scoped lang="scss">
  h2 {
    text-align: center;
  }

  .main {
    margin-top: 30px;
  }

  /deep/ .sh-card {

    &.sh-card--active .sh-card-inner {
      transform: scale(1.05);
    }
  }
</style>