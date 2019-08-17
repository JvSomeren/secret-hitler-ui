<template>
  <section>
    <h2>PICK YOUR USERNAME</h2>

    <ShInput
      v-model="name"
      :value="name"
      placeholder="Player" />

    <ShButton
      class="sh-bottom"
      :disabled="disabled"
      @click.native="_create">Create</ShButton>
  </section>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {mapFields} from 'vuex-map-fields';
import {onlineMutations} from '@/state/modules/Online/mutations';

const online = namespace('online');

@Component({
  computed: {
    ...mapFields(`online`, ['user.name']),
  },
})
export default class Host extends Vue {
  @online.State((state) => state.user.name)
  private username!: string;

  @online.Action('createLobby')
  private createLobby!: () => void;

  @online.Mutation(onlineMutations.resetState)
  private resetState!: () => void;

  private disabled = false;

  private _create(e: MouseEvent) {
    if (this.username === '') return;

    this.createLobby();
  }

  private created() {
    this.resetState();
  }
}
</script>

<style scoped lang="scss">
</style>
