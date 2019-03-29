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
  private text: string;

  private _click() {
    this.$router.back();
  }
}
</script>

<style scoped lang="scss">
  .sh-back {
    position: absolute;
    top: 0;
    left: 0;

    padding: 6px 0 0 6px;
  }
</style>