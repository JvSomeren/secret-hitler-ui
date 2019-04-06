<template>
  <div>
    <ShBack endPrompt>
      X Exit
    </ShBack>

    <ShHeaderLogo />

    <section class="main">
      <h2>Pick a president</h2>

      <div class="sh-scrollable-vert">
        <ShButton @click.native="_click()">Default: random</ShButton>

        <div class="sh-player-grid">
          <ShButton
            v-for="player in players"
            :key="player.id"
            @click.native="_click(player)">
            {{ player.name }}
          </ShButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {GameStatus, Player} from '@/state/modules/Standalone/types';
import random from 'lodash/random';
import {standaloneMutations} from '@/state/modules/Standalone/mutations';

const standalone = namespace('standalone');

@Component({})
export default class InitialPresident extends Vue {
  @standalone.Getter('allPlayers')
  private players!: Player[];

  @standalone.Mutation(standaloneMutations.setPresident)
  private setPresident!: any;

  @standalone.Action('navigate')
  private navigate!: any;

  private _click(player: Player | null = null) {
    if (player === null) player = this.players[random(this.players.length - 1)];

    this.setPresident(player);
    this.navigate({
      routeName: 'standalone:nominateChancellor',
      status: GameStatus.NOMINATING_CHANCELLOR,
    });
  }
}
</script>

<style scoped lang="scss">
  .sh-player-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 0 6px 0 6px;
  }
</style>