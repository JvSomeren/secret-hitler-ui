<template>
  <article
    class="sh-collapsible"
    :class="{ 'sh-collapsible--active': active }">
    <div
      class="sh-collapsible-head"
      ref="head"
      @click="_toggle">
      <Arrow /><h3 class="sh-collapsible-title">{{ title }}</h3>
    </div>

    <div class="sh-collapsible-content" ref="content">
      <slot />
    </div>
  </article>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Arrow from '@/assets/arrow-back.svg';

@Component({
  components: {
    Arrow,
  },
})
export default class Collapsible extends Vue {
  @Prop({type: String, default: ''})
  private title!: string;

  private active = false;

  private _toggle() {
    this.active = !this.active;

    const content = this.$refs.content as HTMLElement;
    const head = this.$refs.head as HTMLElement;

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      head.scrollIntoView();
    }
  }
}
</script>

<style scoped lang="scss">

  .sh-collapsible {

    &-head {
      display: flex;
      align-items: center;
      padding: 6px;

      text-transform: uppercase;
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);

      svg {
        fill: #434343;
        transition: transform 200ms ease-out;
        transform: rotate(-180deg);
      }
    }

    &-title {
      margin: auto 0;
    }

    &-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 200ms ease-out;
      padding: 0 8px;

      p {
        line-height: 1.3;
        text-align: justify;

        &:first-of-type {
          margin-top: 0;
        }
      }

      ul {
        padding: 0 0 0 24px;
      }

      svg {
        fill: darken(#434343, 5%);
        float: left;
        margin-right: 6px;
      }
    }

    &--active {
      .sh-collapsible-head svg {
        transform: rotate(-90deg);
      }
    }
  }
</style>