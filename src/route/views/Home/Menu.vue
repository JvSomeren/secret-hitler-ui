<template>
  <section>
    <ShLink to="standalone-lobby">Standalone</ShLink>

    <h2>ONLINE</h2>
    <ShLink to="/" disabled>Host game</ShLink>
    <ShLink to="/" disabled>Join game</ShLink>

    <ShLink to="rules" class="sh-bottom">Rules</ShLink>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
})
export default class Menu extends Vue {}
</script>

<style scoped lang="scss">
</style>
