<template>
  <ShButton :click="_click">
    <slot />
  </ShButton>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Link extends Vue {
  @Prop([String, Location])
  private to!: string | object;

  private _click() {
    this.$router.push(this.to);
  }
}
</script>

<style lang="scss">

</style>