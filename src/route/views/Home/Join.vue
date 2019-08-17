<template>
  <section>
    <h2>username + lobby ID</h2>

    <ShInput
      v-model="name"
      :value="name"
      placeholder="Player" />

    <ShInput
      class="lobby-input"
      v-model="lobbyId"
      :value="lobbyId"
      placeholder="Lobby ID" />

    <ShButton
      class="sh-bottom"
      :disabled="disabled"
      @click.native="_connect">Connect</ShButton>
  </section>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {mapFields} from 'vuex-map-fields';

const online = namespace('online');

@Component({
  computed: {
    ...mapFields(`online`, ['user.name']),
  },
})
export default class Join extends Vue {
  @online.State((state) => state.user.name)
  private username!: string;

  @online.Action('connectToLobby')
  private connectToLobby!: (lobbyID: string) => Promise<boolean>;

  private disabled = false;
  private lobbyId: string = '';

  private validateLobbyId() {
    if (this.lobbyId.length !== 4) return false;
    if (/[^a-z0-9]/gi.test(this.lobbyId)) return false;

    return true;
  }

  private _connect(e: MouseEvent) {
    if (this.username === '') return;
    if (!this.validateLobbyId()) return;
    // check if lobbyid is defined

    this.lobbyId = this.lobbyId.toUpperCase();

    this.disabled = true;
    this.connectToLobby(this.lobbyId)
      .then((success: boolean) => this.disabled = success);
  }
}
</script>

<style scoped lang="scss">
  .lobby-input {
    text-transform: uppercase;

    &::placeholder {
      text-transform: capitalize;
    }
  }
</style>
