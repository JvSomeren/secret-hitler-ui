<template>
  <ShCard :light="!!ja" :dark="!!nein">
    <Ja v-if="ja" id="sh-ja" />
    <Nein v-else-if="nein" id="sh-nein" />
  </ShCard>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Ja from '@/assets/ja.svg';
import Nein from '@/assets/nein.svg';

@Component({
  components: {
    Ja,
    Nein,
  },
})
export default class VoteCard extends Vue {
  @Prop({type: Boolean, default: false})
  private ja?: boolean;
  @Prop({type: Boolean, default: false})
  private nein?: boolean;
}
</script>

<style scoped lang="scss">
  #sh-ja,
  #sh-nein {
    transform: rotate(90deg);
  }
</style>