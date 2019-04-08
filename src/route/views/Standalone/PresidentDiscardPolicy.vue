<template>
  <div>
    <section class="main">
      <template v-if="state === PresidentDiscardPolicyState.PASS_DEVICE">
        <PassDevice
          :player="president"
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
          @click.native="_confirm">Discard</ShButton>
      </template>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PassDevice from '@/components/PassDevice.vue';
import {namespace} from 'vuex-class';
import {Card, GameStatus, Player, Policy} from '@/state/modules/Standalone/types';
import LogoLiberal from '@/assets/logo-liberal.svg';
import LogoFascist from '@/assets/logo-fascist.svg';
import {standaloneMutations} from '@/state/modules/Standalone/mutations';

const standalone = namespace('standalone');

enum PresidentDiscardPolicyState {
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
export default class PresidentDiscardPolicy extends Vue {
  @standalone.State((state) => state.game.president)
  private president!: Player;

  @standalone.State((state) => state.game.drawnPolicies)
  private cards!: Card[];

  @standalone.Action('drawCards')
  private drawCards!: any;

  @standalone.Mutation(standaloneMutations.discardCard)
  private discardCard!: any;

  @standalone.Action('navigate')
  private navigate!: any;

  private PresidentDiscardPolicyState = PresidentDiscardPolicyState;
  private Policy = Policy;

  private state = PresidentDiscardPolicyState.PASS_DEVICE;
  private selectedCardIndex: number | null = null;

  private _passed() {
    this.state = PresidentDiscardPolicyState.DISCARDING_POLICY;
    this.drawCards();
  }

  private _click(cardIndex: number) {
    this.selectedCardIndex = cardIndex;
  }

  private _confirm() {
    // move selected card to discard pile
    this.discardCard(this.selectedCardIndex);
    // navigate
    this.navigate({
      routeName: 'standalone:chancellorDiscardPolicy',
      status: GameStatus.CHANCELLOR_DISCARDING_POLICY,
    });
  }
}
</script>

<style scoped lang="scss">
  h2 {
    text-align: center;
  }

  /deep/ .sh-card {

    &-inner {
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
    }

    &.sh-card--active .sh-card-inner {
      transform: scale(1.05);
    }
  }
</style>