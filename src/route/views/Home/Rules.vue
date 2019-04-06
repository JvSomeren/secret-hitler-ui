<template>
  <section>
    <ShBack />

    <div class="sh-rules">
      <h3>OBJECTIVE</h3>
      <h3>SET UP</h3>
      <h2>GAMEPLAY</h2>
      <h3>ELECTION</h3>
      <h3>LEGISLATIVE SESSION</h3>
      <h3>PRESIDENTIAL POWERS</h3>
      <h3>VETO POWER</h3>
      <!--<ol>-->
        <!--<li>Pass the Presidential Candidacy</li>-->
        <!--<li>Nominate a Chancellor</li>-->
      <!--</ol>-->
    </div>

    <ShLink
      class="sh-bottom"
      :file="`${publicPath}Secret_Hitler_Rules.pdf`">Full version [PDF]</ShLink>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Rules extends Vue {
  private publicPath: string = process.env.BASE_URL;
}
</script>

<style scoped lang="scss">
  .sh-rules {
    flex: 1;
    align-self: stretch;
    height: 100%;
    overflow-y: auto;

    font-family: 'Courier', Courier, monospace;
  }
</style>
