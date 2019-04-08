<template>
  <div>
    <div class="sh-game-info-open" @click="_open">
      <span class="sh-game-info-open-text">Info</span>
      <Arrow class="sh-game-info-open-arrow" />
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
                :class="{ 'sh-orb--active': n }">
                <span>{{ index + 1 }}</span>
              </div>
            </div>
          </div>
          <div class="sh-info-track sh-info-track-fascist">
            <span>fascist</span>

            <div class="sh-orb-track">
              <div
                class="sh-orb"
                v-for="(n, index) in fascistTrack"
                :key="index"
                :class="{ 'sh-orb--active': n }">
                <span>{{ index + 1 }}</span>
                <Investigate v-if="!n && index === 0 && playerCount >= 9" />
                <Investigate v-else-if="!n && index === 1 && playerCount >= 7" />
                <PolicyPeek v-else-if="!n && index === 2 && playerCount <= 6" />
                <SpecialElection v-else-if="!n && index === 2 && playerCount >= 7" />
                <Execution v-else-if="!n && index === 3 || index === 4" />
              </div>
            </div>
          </div>
        </div>

        <div class="sh-info-card-action">
          <span>next fascist policy</span>
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
              :class="{ 'sh-orb--active': n }">{{ n ? '' : index }}</div>
          </div>
        </div>
      </div>

      <div class="sh-game-info-bottom">
        <div class="sh-game-info-bottom-scoop-container">
          <div class="sh-game-info-bottom-scoop"></div>
        </div>
        <div @click="_close" class="sh-game-info-close">
          <span>close</span>
          <Arrow class="sh-game-info-close-arrow" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {GameInfo} from '@/state/modules/Standalone/types';
import Arrow from '@/assets/arrow-back.svg';
import Investigate from '@/assets/investigate.svg';
import SpecialElection from '@/assets/elect.svg';
import PolicyPeek from '@/assets/peek.svg';
import Execution from '@/assets/execute.svg';

const ns = namespace('standalone');

@Component({
  components: {
    Arrow,
    Investigate,
    SpecialElection,
    PolicyPeek,
    Execution,
  },
})
export default class GameInfoDrawer extends Vue {
  @ns.State('playerCount')
  private playerCount!: number;

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
  $liberal-blue: #557d84;
  $fascist-red: #f2654b;
  $election-tracker-orb: #0e3067;

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
      display: flex;
      flex-direction: column;
      align-items: center;

      background-color: $bg-color;
      color: #fff;
      border-bottom-left-radius: 8px;

      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);

      svg {
        fill: #fff;
        width: unset;
        height: 18px;
      }
    }

    &-open {
      padding-top: 6px;
      padding-bottom: 2px;
      margin-left: 8px;

      svg {
        transform: rotate(-90deg);
        margin-top: -6px;
      }
    }

    &-close {
      flex-direction: column-reverse;
      padding-bottom: 4px;

      svg {
        transform: rotate(90deg);
      }
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
      z-index: 1;

      .sh-orb-track {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &--horizontal {
          flex-direction: row;
        }

        .sh-orb {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          width: 40px;
          border-radius: 50%;

          background-color: lighten($bg-color, 10%);

          &--active:after {
            content: '';
            display: block;
            height: 30px;
            width: 30px;
            border-radius: 50%;
            box-shadow: 0 0 8px -2px #000;
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
          flex-direction: row;

          > span {
            writing-mode: vertical-lr;
            transform: rotate(180deg);
            padding-left: 2px;
            font-family: 'Courier', Courier, monospace;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .sh-orb {
            margin: 5px 0;

            span {
              font-family: 'Courier', Courier, monospace;
              position: absolute;
              right: -14px;
            }

            svg {
              fill: rgba(#fff, 0.7);
              width: unset;
              height: 18px;
            }
          }

          &-liberal {
            .sh-orb:after {
              background-color: lighten($liberal-blue, 5%);
            }
          }

          &-fascist {
            .sh-orb:nth-child(n+4) {
              background-color: rgba($fascist-red, 0.5);

              svg {
                fill: rgba(#fff, 0.8);
              }
            }

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
        justify-content: center;

        span:first-child {
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .sh-presidential-power {
          font-weight: bold;
          font-size: 24px;
          line-height: 1.3;
        }
      }

      &-piles {
        flex: 1;

        .sh-info-pile {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .sh-pile-name {
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .sh-pile-amount {
          font-size: 30px;
          font-weight: bold;
          margin-top: 2px;
          margin-left: -6px;
        }
      }

      &-election-tracker {
        flex: 1;
        display: flex;
        flex-direction: column;

        span {
          text-transform: uppercase;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .sh-orb-track {
          flex: 1;
          margin: 0 auto;

          .sh-orb {
            font-weight: bold;
            margin: 0 12px;
          }
        }

        .sh-orb:after {
          background-color: $election-tracker-orb;
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

      &-scoop-container {
        flex: 4;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        align-self: stretch;
      }

      &-scoop {
        flex: 1;
        overflow: hidden;
        position: relative;
        max-width: 16px;
        min-height: 16px;

        &:before {
          content: '';
          position: absolute;
          border-radius: 50%;
          margin: -16px;
          padding: 16px;
          box-shadow: 0 0 0 40px $bg-color;
          bottom: 0;
          left: 0;
        }
      }

      &:before {
        content: '';
        display: block;
        width: 100%;
        height: 8px;
        align-self: flex-start;
        margin-top: -8px;
        background-color: rgba(0, 0, 0, 0.25);
        position: absolute;
      }
    }
  }
</style>