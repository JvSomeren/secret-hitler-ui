<template>
  <div class="sh-card"
       :class="{ 'sh-card-light': light, 'sh-card-dark': dark, 'sh-card--active': _active }">
    <div
      class="sh-card-inner"
      @click="_click">
      <div class="sh-card-front">
        <div class="sh-card-inner-border">
          <slot></slot>
        </div>
      </div>

      <div class="sh-card-back">
        <div class="sh-card-inner-border">
          <slot name="back"><Decal id="sh-decal" /></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Decal from '@/assets/decal.svg';

@Component({
  components: {
    Decal,
  },
})
export default class Card extends Vue {
  @Prop({type: Boolean, default: false})
  private light?: boolean;

  @Prop({type: Boolean, default: false})
  private dark?: boolean;

  @Prop({default: null})
  private flipped?: boolean | null;

  private active = false;

  get _active() {
    if (this.flipped !== null) return this.flipped;

    return this.active;
  }

  private _click() {
    if (this.flipped === null) return this.active = !this.active;
  }
}
</script>

<style scoped lang="scss">
  $sh-card-bg: #434343;
  $sh-card-bg-light: #F7E1C3;

  .sh-card {
    flex: 1;
    align-self: stretch;
    perspective: 1000px;
    padding: 8px 16px;


    &--active {
      z-index: 1;

      &.sh-card-light .sh-card-inner {
        transform: rotateY(180deg) translateY(35%);
      }

      &.sh-card-dark .sh-card-inner {
        transform: rotateY(180deg) translateY(-35%);
      }
    }
  }

  .sh-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 16px;

    background: $sh-card-bg;
    border-radius: 16px;

    transition: transform 300ms ease;
    transform-style: preserve-3d;
  }

  .sh-card-inner-border {
    display: flex;
    justify-content: center;
    align-items: center;

    border: 4px dotted $sh-card-bg;
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    backface-visibility: inherit;
  }

  .sh-card-front,
  .sh-card-back {
    position: absolute;
    width: calc(100% - 32px);
    height: calc(100% - 32px);
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: $sh-card-bg-light;

    svg {
      backface-visibility: inherit;
    }
  }

  .sh-card-back {
    transform: rotateY(180deg) translateZ(1px);

    svg {
      fill: $sh-card-bg;
    }
  }

  .sh-card-dark {

    & .sh-card-front {
      background-color: $sh-card-bg;

      & .sh-card-inner-border {
        border-color: $sh-card-bg-light;
        width: calc(100% - 8px);
        height: calc(100% - 8px);
      }
    }
  }

  .sh-card-light .sh-card-front svg {
    fill: $sh-card-bg;
  }

  .sh-card-dark .sh-card-front svg {
    fill: $sh-card-bg-light;
  }
</style>