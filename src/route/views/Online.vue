<template>
  <router-view class="root-container"></router-view>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';

const online = namespace('online');

@Component({})
export default class Online extends Vue {
  @online.State((state) => state.user.isHost)
  private isHost!: boolean;

  @online.State((state) => state.user.peerId)
  private peerId!: string | null;

  @online.Action('registerPeerAsHost')
  private registerPeerAsHost!: () => void;

  private created() {
    if (this.isHost && this.$peer.id !== this.peerId) this.registerPeerAsHost();
  }
}
</script>

<style scoped lang="scss">
</style>
