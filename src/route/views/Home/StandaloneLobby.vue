<template>
  <section>
    <ShBack />

    <div>
      <h2>NUMBER OF PLAYERS</h2>
      <div class="player-numbers-grid">
        <ShButton>5</ShButton>
        <ShButton>6</ShButton>
        <ShButton>7</ShButton>
        <ShButton>8</ShButton>
        <ShButton>9</ShButton>
        <ShButton>10</ShButton>
      </div>
    </div>

    <ShLink to="vote-cards">Vote cards</ShLink>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
})
export default class StandaloneLobby extends Vue {}
</script>

<style scoped lang="scss">
  .main {
    justify-content: space-between;
  }

  .player-numbers-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    .sh-button {
      min-width: unset;
      flex-basis: 30%;
      padding: 12px 12px;
      /*margin: 0 5px 16px 5px;*/
    }
  }
</style>
