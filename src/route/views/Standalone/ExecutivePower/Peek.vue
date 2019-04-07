<template>
  <div>
    <ShBack endPrompt>X Exit</ShBack>

    <section class="main">
      <template v-if="state === PeekState.PASS_DEVICE">
        <PassDevice
          :player="president"
          @passed="_passed" />
      </template>

      <template v-else>
        <h2>TOP 3 CARDS OF THE DRAW PILE</h2>
        <h5>Top to bottom</h5>

        <ShCard
          v-for="(card, index) in topOfDrawPile"
          :key="card.id"
          light
          :liberal="card.policy === Policy.Liberal"
          :fascist="card.policy === Policy.Fascist"
          :flipped="false">
          <LogoLiberal v-if="card.policy === Policy.Liberal" />
          <LogoFascist v-else-if="card.policy === Policy.Fascist" />
        </ShCard>

        <ShButton
          class="sh-bottom"
          :disabled="disabled"
          @click.native="_click()">I've seen them</ShButton>
      </template>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {Card, GameStatus, Player, Policy} from '@/state/modules/Standalone/types';
import PassDevice from '@/components/PassDevice.vue';
import LogoLiberal from '@/assets/logo-liberal.svg';
import LogoFascist from '@/assets/logo-fascist.svg';

const standalone = namespace('standalone');

enum PeekState {
  PASS_DEVICE,
  PEEKING,
}

@Component({
  components: {
    PassDevice,
    LogoLiberal,
    LogoFascist,
  },
})
export default class Peek extends Vue {
  @standalone.State((state) => state.game.lastGovernment.president)
  private president!: Player;

  @standalone.Getter('topOfDrawPile')
  private topOfDrawPile!: Card[];

  @standalone.Action('navigate')
  private navigate!: any;

  private Policy = Policy;
  private PeekState = PeekState;

  private disabled = true;
  private state = PeekState.PASS_DEVICE;

  private _passed() {
    setTimeout(() => {
      this.disabled = false;
    }, 1000);
    this.state = PeekState.PEEKING;
  }

  private _click() {
    if (this.disabled) return;

    this.navigate({
      routeName: 'standalone:nominateChancellor',
      status: GameStatus.NOMINATING_CHANCELLOR,
    })
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
</style>