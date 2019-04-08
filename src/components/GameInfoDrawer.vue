<template>
  <div>
    <div>
      <span class="sh-game-info-open" @click="_open">Info</span>
    </div>

    <section
      class="sh-game-info"
      :class="{
      'sh-game-info--active': active }">
      <div class="sh-info">
        <div class="sh-info-tracks">
          <div class="sh-info-track sh-info-track-liberal">
            <span>liberal</span>

            <div class="sh-orb-track">
              <div
                class="sh-orb"
                v-for="(n, index) in liberalTrack"
                :key="index"
                :class="{ 'sh-orb--active': n }"></div>
            </div>
          </div>
          <div class="sh-info-track sh-info-track-fascist">
            <span>fascist</span>

            <div class="sh-orb-track">
              <div
                class="sh-orb"
                v-for="(n, index) in fascistTrack"
                :key="index"
                :class="{ 'sh-orb--active': n }"></div>
            </div>
          </div>
        </div>

        <div class="sh-info-card-action">
          <span>next card action</span>
          <span class="sh-presidential-power">{{ nextPower }}</span>
        </div>

        <div class="sh-info-piles">
          <div class="sh-info-pile sh-info-pile-draw">
            <span class="sh-pile-name">draw</span>
            <span class="sh-pile-amount">{{ drawPileAmount }}</span>
          </div>
          <div class="sh-info-pile sh-info-pile-discard">
            <span class="sh-pile-name">discard</span>
            <span class="sh-pile-amount">{{ discardPileAmount }}</span>
          </div>
        </div>

        <div class="sh-info-election-tracker">
          <span>election tracker</span>

          <div class="sh-orb-track sh-orb-track--horizontal">
            <div
              class="sh-orb"
              v-for="(n, index) in electionTrack"
              :key="index"
              :class="{ 'sh-orb--active': n }"></div>
          </div>
        </div>
      </div>

      <div class="sh-game-info-bottom">
        <div style="flex: 4"></div>
        <div @click="_close" class="sh-game-info-close">
          <span>close</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {GameInfo} from '@/state/modules/Standalone/types';

const ns = namespace('standalone');

@Component({})
export default class GameInfoDrawer extends Vue {
  @ns.Getter('gameInfo')
  private gameInfo!: GameInfo;

  private active = false;

  get liberalTrack() {
    return this.gameInfo.liberalTrack;
  }

  get fascistTrack() {
    return this.gameInfo.fascistTrack;
  }

  get nextPower() {
    return this.gameInfo.nextPower;
  }

  get drawPileAmount() {
    return this.gameInfo.drawPileAmount;
  }

  get discardPileAmount() {
    return this.gameInfo.discardPileAmount;
  }

  get electionTrack() {
    return this.gameInfo.electionTrack;
  }

  private _open() {
    this.active = true;
  }

  private _close() {
    this.active = false;
  }

  private _toggle() {
    this.active = !this.active;
  }
}
</script>

<style scoped lang="scss">
  $bg-color: #434343;
  $bg-color-light: #F7E1C3;
  $liberal-blue: #698176;
  $fascist-red: #f2654b;

  .sh-game-info {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;

    display: flex;
    flex-direction: column;

    color: #fff;

    transition: all 400ms ease-in-out;
    transform: translateY(-100%);

    &-open,
    &-close {
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
    }

    &--active {
      transform: translateY(0);

      .sh-game-info-bottom {
        background-color: rgba(0, 0, 0, 0.25);
      }
    }

    .sh-info {
      flex: 1;
      display: flex;
      flex-direction: column;

      background-color: $bg-color;
      border-bottom-left-radius: 8px;

      .sh-orb-track {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        &--horizontal {
          flex-direction: row;
        }

        .sh-orb {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          width: 40px;
          border-radius: 50%;

          background-color: lighten($bg-color, 20%);

          &--active:after {
            content: '';
            display: block;
            height: 30px;
            width: 30px;
            border-radius: 50%;
          }
        }
      }

      &-tracks,
      &-piles {
        display: flex;
        justify-content: space-around;
      }

      &-tracks {
        flex: 4;

        .sh-info-track {
          display: flex;
          flex-direction: column;

          &-liberal {
            .sh-orb:after {
              background-color: $liberal-blue;
            }

            .sh-orb-track {
              max-height: 80%;
              margin: auto 0;
            }
          }

          &-fascist {
            .sh-orb:after {
              background-color: $fascist-red;
            }
          }
        }
      }

      &-card-action {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      &-piles {
        flex: 1;

        .sh-info-pile {
          display: flex;
          flex-direction: column;
        }

        .sh-pile-name {

        }

        .sh-pile-amount {
          font-weight: bold;
        }
      }

      &-election-tracker {
        flex: 1;

        .sh-orb-track {
          max-width: 80%;
          margin: 0 auto;
        }

        .sh-orb:after {
          background-color: purple;
        }
      }
    }

    &-bottom {
      height: 40px;
      display: flex;
      align-items: center;

      background-color: transparent;
      transition: background-color 400ms ease-in;

      .sh-game-info-close {
        position: relative;
        flex: 1;
        align-self: stretch;
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: $bg-color;
        border-bottom-left-radius: 8px;
        margin-bottom: 8px;

        span {
          margin-top: -3px;
        }
      }
    }
  }
</style>