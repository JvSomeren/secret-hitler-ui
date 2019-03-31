<template>
  <div class="sh-card"
    :class="{ 'sh-card-ja': ja, 'sh-card-nein': nein, 'sh-card--active': active }">
    <div
      class="sh-card-inner"
      @click="active = !active">
      <div class="sh-card-front">
        <div class="sh-card-inner-border">
          <Ja v-if="ja" id="sh-ja" />
          <Nein v-else-if="nein" id="sh-nein" />
        </div>
      </div>

      <div class="sh-card-back">
        <div class="sh-card-inner-border">
          <Decal id="sh-decal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Ja from '@/assets/ja.svg';
import Nein from '@/assets/nein.svg';
import Decal from '@/assets/decal.svg';

@Component({
  components: {
    Ja,
    Nein,
    Decal,
  },
})
export default class VoteCard extends Vue {
  @Prop({type: Boolean, default: false})
  private ja?: boolean;
  @Prop({type: Boolean, default: false})
  private nein?: boolean;

  private active = false;
}
</script>

<style scoped lang="scss">
  $sh-card-bg: #434343;
  $sh-card-bg-light: #F7E1C3;

  .sh-card {
    flex: 1;
    perspective: 1000px;
    padding: 8px 16px;


    &--active {
      z-index: 1;

      &.sh-card-ja .sh-card-inner {
        transform: rotateY(180deg) translateY(35%);
      }

      &.sh-card-nein .sh-card-inner {
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
  }

  .sh-card-back {
    transform: rotateY(180deg);
  }

  .sh-card-nein {

    & .sh-card-front {
      background-color: $sh-card-bg;

      & .sh-card-inner-border {
        border-color: $sh-card-bg-light;
        width: calc(100% - 8px);
        height: calc(100% - 8px);
      }
    }
  }

  #sh-decal {
    fill: $sh-card-bg;
  }

  #sh-ja {
    fill: $sh-card-bg;
  }

  #sh-nein {
    fill: $sh-card-bg-light;
  }

  #sh-ja,
  #sh-nein {
    transform: rotate(90deg);
  }
</style>