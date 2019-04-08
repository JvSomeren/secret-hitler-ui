<template>
  <div>
    <ShHeaderLogo />

    <section class="main sh-lobby-player-count">
      <div>
        <h2>NUMBER OF PLAYERS</h2>
        <div class="sh-player-numbers-grid">
          <ShButton
            v-for="n in range(5, 11)"
            :key="n"
            @click.native="_click(n)">
            {{ n }}
          </ShButton>
        </div>
      </div>

      <ShLink to="voteCards">Vote cards</ShLink>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import range from 'lodash/range';
import LogoVertical from '@/assets/logo-vertical.svg';
import {namespace} from 'vuex-class';
import {standaloneMutations} from '@/state/modules/Standalone/mutations';

const standalone = namespace('standalone');

@Component({
  components: {
    LogoVertical,
  },
})
export default class StandalonePlayerCount extends Vue {
  @standalone.Mutation(standaloneMutations.updatePlayerCount)
  private updatePlayerCount!: any;

  private range = range;

  private _click(n: number) {
    this.updatePlayerCount(n);

    this.$router.push({ name: 'standalone:playerNames' });
  }
}
</script>

<style scoped lang="scss">
  .main {
    justify-content: space-between;
  }

  .sh-player-numbers-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    .sh-button {
      min-width: unset;
      flex-basis: 30%;
      padding: 12px 12px;
      /*margin: 0 5px 16px 5px;*/
    }
  }
</style>
