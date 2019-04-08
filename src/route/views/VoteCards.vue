<template>
  <section class="sh-vote-cards">
    <VoteCard ja />
    <VoteCard nein />
  </section>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import VoteCard from '@/components/VoteCard.vue';

@Component({
  components: {
    VoteCard,
  },
})
export default class VoteCards extends Vue {}
</script>

<style scoped lang="scss">
  .sh-vote-cards {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    overflow: hidden;
  }
</style>