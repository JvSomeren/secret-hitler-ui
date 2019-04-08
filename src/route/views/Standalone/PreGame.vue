<template>
  <div>
    <ShHeaderLogo />

    <section class="main">
      <h2>FOLLOW THE DIRECTIONS BELOW</h2>

      <div class="sh-scrollable-vert sh-instructions">
        <template v-if="playerCount <= 6">
          <ul>
            <li>Everybody close your eyes</li>
            <li>Fascist and Hitler, open your eyes and acknowledge each other</li>
            <p>[Take a long pause]</p>
            <li>Everyone close your eyes</li>
            <li>Everyone can open your eyes. <br>
              If anyone is confused or something went wrong, please tell the group now</li>
          </ul>
        </template>

        <template v-else-if="playerCount >= 7">
          <ul>
            <li>Everybody close your eyes and extend your hand into a fist in front of you</li>
            <li>All Fascist who are NOT Hitler should open their eyes and acknowledge each other</li>
            <li>Hitler - keep your eyes closed but put your thumb out into a thumbs-up gesture</li>
            <li>Fascist, take note of who has an extended thumb - that player is Hitler</li>
            <p>[Take a long pause]</p>
            <li>Everyone close your eyes and put your hands down</li>
            <li>Everyone can open your eyes. <br>
              If anyone is confused or something went wrong, please tell the group now</li>
          </ul>
        </template>
      </div>

      <ShButton
        class="sh-bottom"
        :disabled="disabled"
        @click.native="_click">Start the game!</ShButton>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {GameStatus} from '@/state/modules/Standalone/types';

const standalone = namespace('standalone');

@Component({})
export default class PreGame extends Vue {
  @standalone.State('playerCount')
  private playerCount!: number;

  @standalone.Action('navigate')
  private navigate!: any;

  private disabled = true;

  private _click() {
    if (this.disabled) return;

    this.navigate({
      routeName: 'standalone:initialPresident',
      status: GameStatus.CHOOSING_INITIAL_PRESIDENT,
    });
  }

  private mounted() {
    setTimeout(() => {
      this.disabled = false;
    }, 1500);
  }
}
</script>

<style scoped lang="scss">
  h2 {
    text-align: center;
  }

  .sh-instructions {
    position: relative;
    font-family: 'Courier', Courier, monospace;

    ul {
      padding: 0 10px 0 25px;
    }
  }

  /deep/ .logo-horizontal {
    .sh-logo-hor-shadow {
      fill: #FBB969;
    }

    .sh-logo-hor-letters,
    .sh-logo-hor-skull {
      fill: #434343;
    }
  }
</style>
