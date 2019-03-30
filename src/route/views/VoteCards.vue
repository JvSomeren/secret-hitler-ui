<template>
  <section class="sh-vote-cards">
    <ShBack />

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
    width: 100%;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    overflow: hidden;
  }
</style>