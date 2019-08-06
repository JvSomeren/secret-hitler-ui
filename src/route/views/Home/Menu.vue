<template>
  <section>
    <ShLink to="standalone">Single Device</ShLink>

    <h2>ONLINE</h2>
    <ShLink to="host" :disabled="!isOnline ">Host game</ShLink>
    <ShLink to="join" :disabled="!isOnline">Join game</ShLink>

    <ShLink to="rules" class="sh-bottom">Rules</ShLink>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {State} from 'vuex-class';

@Component({
})
export default class Menu extends Vue {
  @State('isOnline')
  private isOnline!: boolean;
}
</script>

<style scoped lang="scss">
</style>
