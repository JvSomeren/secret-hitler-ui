<template>
  <div
    v-if="isActive"
    class="sh-snackbar"
    :class="classes">
    <span
      v-if="text"
      class="sh-snackbar__text">{{ text }}</span>

    <div class="sh-snackbar__content">
      <slot  />
    </div>

    <span
      class="sh-snackbar__close"
      @click="close">x</span>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

@Component
export default class Snackbar extends Vue {
  @Prop({type: String, default: ''})
  private text?: string;

  @Prop({type: Number, default: 6000})
  private timeout?: number;

  @Prop({type: Boolean, default: false})
  private top?: boolean;

  @Prop({type: Boolean, default: false})
  private bottom?: boolean;

  @Prop({type: Boolean, default: false})
  private left?: boolean;

  @Prop({type: Boolean, default: false})
  private right?: boolean;

  private activeTimeout = -1;

  private isActive = true;

  get classes() {
    return {
      'sh-snackbar--top-left': this.top && this.left,
      'sh-snackbar--top-right': this.top && this.right,
      'sh-snackbar--bottom-left': this.bottom && this.left,
      'sh-snackbar--bottom-right': this.bottom && this.right,
    };
  }

  private close() {
    this.isActive = false;
  }

  private validateProps() {
    if (process.env.NODE_ENV === 'production') return;

    if (this.top && this.bottom) {
      return console.warn(
        `Invalid <ShSnackbar> props:\n\n${JSON.stringify(
          this.$props,
          null,
          2,
        )}\n\nEither an \`top\` or an \`bottom\` can be passed, not both.`,
      );
    }
    if (this.left && this.right) {
      return console.warn(
        `Invalid <ShSnackbar> props:\n\n${JSON.stringify(
          this.$props,
          null,
          2,
        )}\n\nEither an \`left\` or an \`right\` can be passed, not both.`,
      );
    }
  }

  private setTimeout() {
    window.clearTimeout(this.activeTimeout);

    if (this.isActive && this.timeout) {
      this.activeTimeout = window.setTimeout(() => {
        this.isActive = false;
      }, this.timeout);
    }
  }

  private created() {
    this.validateProps();
  }

  private mounted() {
    this.setTimeout();
  }
}
</script>

<style scoped lang="scss">
  .sh-snackbar {
    position: fixed;
    margin: 12px;
    pointer-events: none;
    z-index: 1000;
    font-size: 16px;

    background-color: #F2654B;
    border-radius: 2px;
    padding: 10px 12px;

    &__text {
      color: #fff;
      margin-right: 16px;
    }

    &__content {
      display: inline-block;
      pointer-events: auto;
      color: #FBB969;
      font-weight: bold;
    }

    &__close {
      pointer-events: auto;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      line-height: 1px;
      margin-left: 16px;
    }

    &--top {
      &-left {
        top: 0;
        left: 0;
      }
      &-right {
        top: 0;
        right: 0;
      }
    }

    &--bottom {
      &-left {
        bottom: 0;
        left: 0;
      }
      &-right {
        bottom: 0;
        right: 0;
      }
    }
  }
</style>