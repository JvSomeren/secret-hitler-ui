<template>
  <div>
    <ShHeaderLogo />

    <section class="main">
      <template v-if="endResult === GameEndResult.LIBERAL_POLICIES">
        <Liberal />
        <h1>VICTORY!</h1>
        <h3>The Liberals have passed 5 liberal policies</h3>
      </template>

      <template v-else-if="endResult === GameEndResult.HITLER_KILLED">
        <Liberal />
        <h1>VICTORY!</h1>
        <h3>Hitler has been executed</h3>
      </template>

      <template v-else-if="endResult === GameEndResult.FASCIST_POLICIES">
        <Fascist />
        <h1>VICTORY!</h1>
        <h3>The Fascists have passed 6 fascist policies</h3>
      </template>

      <template v-else-if="endResult === GameEndResult.HITLER_CHANCELLOR">
        <Fascist />
        <h1>VICTORY!</h1>
        <h3>Hitler has been elected as chancellor</h3>
      </template>

      <div class="sh-bottom sh-row">
        <ShButton
          :disabled="disabled"
          @click.native="_click(false)">End game</ShButton>
        <ShButton
          :disabled="disabled"
          @click.native="_click(true)">Play again</ShButton>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {GameEndResult, GameStatus} from '@/state/modules/Standalone/types';
import {namespace} from 'vuex-class';
import {standaloneMutations} from '@/state/modules/Standalone/mutations';
import Liberal from '@/assets/liberal.svg';
import Fascist from '@/assets/fascist.svg';

const standalone = namespace('standalone');

@Component({
  components: {
    Liberal,
    Fascist,
  },
})
export default class GameEnd extends Vue {
  @standalone.State((state) => state.game.endResult)
  private endResult!: GameEndResult;

  @standalone.Action('navigate')
  private navigate!: any;

  @standalone.Mutation(standaloneMutations.resetState)
  private resetStateStandalone!: any;

  private GameEndResult = GameEndResult;

  private disabled = true;

  private navigateNewGame() {
    this.navigate({
      routeName: 'standalone:playerCount',
      status: GameStatus.STOPPED,
    });
  }

  private navigateHome() {
    this.navigate({
      routeName: 'home',
      status: GameStatus.STOPPED,
    });
  }

  private _click(newGame: boolean) {
    if (this.disabled) return;

    if (newGame) this.navigateNewGame();
    else this.navigateHome();

    this.resetStateStandalone();
  }

  private mounted() {
    setTimeout(() => {
      this.disabled = false;
    }, 1000);
  }
}
</script>

<style scoped lang="scss">
  $liberal-blue: #698176;
  $fascist-red: #f2654b;
  
  h1,
  h3 {
    text-align: center;
  }

  .text-liberal {
    fill: $liberal-blue;
  }

  .text-fascist {
    fill: $fascist-red;
  }

  .text-liberal,
  .text-fascist {
    height: unset;
    width: calc(60%);
  }
</style>