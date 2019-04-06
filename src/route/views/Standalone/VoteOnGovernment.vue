<template>
  <div>
    <ShBack endPrompt>
      X Exit
    </ShBack>

    <section class="main">
      <div class="sh-president">
        <h3>President</h3>
        <h2>{{ government.president.name }}</h2>
      </div>

      <div class="sh-chancellor">
        <h3>Chancellor</h3>
        <h2>{{ government.chancellor.name }}</h2>
      </div>

      <div class="sh-instructions">
        <p>If the vote is a tie, or if a majority of players vote no the vote fails.</p>
        <p>If a majority of players vote yes the vote passes.</p>
      </div>

      <div class="sh-bottom sh-row">
        <ShButton
          :disabled="disabled"
          @click.native="_click(false)">Failed</ShButton>
        <ShButton
          :disabled="disabled"
          @click.native="_click(true)">Passed</ShButton>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {Government} from '@/state/modules/Standalone/types';

const standalone = namespace('standalone');

@Component({})
export default class VoteOnGovernment extends Vue {
  @standalone.Getter('government')
  private government!: Government;

  @standalone.Action('governmentVotePassed')
  private votePassed!: any;

  @standalone.Action('governmentVoteFailed')
  private voteFailed!: any;

  private disabled = true;

  private _click(passed: boolean) {
    if (this.disabled) return;

    if (passed) this.votePassed();
    else this.voteFailed();
  }

  private mounted() {
    setTimeout(() => {
      this.disabled = false;
    }, 2000);
  }
}
</script>

<style scoped lang="scss">
  .sh-president,
  .sh-chancellor {
    text-align: center;
  }

  .sh-instructions {
    font-family: 'Courier', Courier, monospace;
  }
</style>