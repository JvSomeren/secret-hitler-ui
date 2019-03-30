<template>
  <div class="sh-back" @click="_click">
    <slot v-if="!!$slots.default" />
    <span v-else>{{ text }}</span>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Back extends Vue {
  @Prop({type: String, default: '< BACK'})
  private text?: string;
  @Prop({type: Boolean, default: false})
  private gotoHome?: boolean;

  private _click() {
    if (this.gotoHome) {
      return this.$router.replace({ name: 'home' });
    }

    this.$router.back();
  }
}
</script>

<style scoped lang="scss">
  .sh-back {
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;

    padding: 6px 0 0 6px;
  }
</style>