<template>
  <section class="main">
    <template v-if="state === ShowRoleState.PASS_DEVICE">
      <h2>Pass the device to</h2>
      <h2>{{ currentPlayer.name }}</h2>
    </template>

    <template v-else-if="state === ShowRoleState.PLAYER_HAS_DEVICE">
      <h2>{{ currentPlayer.name }}</h2>
      <h2>press the button below to view your role</h2>
    </template>

    <template v-else-if="state === ShowRoleState.SHOWING_ROLE">
      <h2>{{ currentPlayer.name }}</h2>
      <h2>your role is</h2>
    </template>

    <template
      v-if="state === ShowRoleState.PLAYER_HAS_DEVICE
        || state === ShowRoleState.SHOWING_ROLE">
      <ShCard light :flipped="flipped">
        <template v-slot:default>
          <Decal />
        </template>

        <template v-slot:back>
          <Liberal v-if="currentPlayer.role.secretRole === SecretRole.Liberal" />
          <Fascist v-else-if="currentPlayer.role.secretRole === SecretRole.Fascist" />
          <Hitler v-else-if="currentPlayer.role.secretRole === SecretRole.Hitler" />
        </template>
      </ShCard>
    </template>

    <ShButton
      class="sh-bottom"
      :disabled="button.disabled"
      @click.native="_click()">{{ button.text }}</ShButton>
  </section>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {Player, SecretRole} from '@/state/modules/Standalone/types';
import Decal from '@/assets/decal.svg';
import Liberal from '@/assets/liberal.svg';
import Fascist from '@/assets/fascist.svg';
import Hitler from '@/assets/hitler.svg';

const standalone = namespace('standalone');

enum ShowRoleState {
  PASS_DEVICE,
  PLAYER_HAS_DEVICE,
  SHOWING_ROLE,
}

@Component({
  components: {
    Decal,
    Liberal,
    Fascist,
    Hitler,
  },
})
export default class StandaloneShowRoles extends Vue {
  @standalone.Getter('allPlayers')
  private players!: Player[];

  private SecretRole = SecretRole;
  private ShowRoleState = ShowRoleState;

  private state = ShowRoleState.PASS_DEVICE;
  private disabled = true;
  private flipped = false;
  private button: { disabled: boolean, text: string } = {
    disabled: true,
    text: 'Ok!',
  };

  private currentPlayerId = 0;
  private currentPlayer: Player | null = null;

  private _click() {
    if (this.button.disabled) return;

    switch (this.state) {
      case ShowRoleState.PASS_DEVICE:
        this.timeoutDisable();
        this.button.text = 'Show me my role!';
        this.state = ShowRoleState.PLAYER_HAS_DEVICE;
        break;
      case ShowRoleState.PLAYER_HAS_DEVICE:
        this.flipped = true;
        this.timeoutDisable(3000);
        this.button.text = 'I\'ve seen enough';
        this.state = ShowRoleState.SHOWING_ROLE;
        break;
      case ShowRoleState.SHOWING_ROLE:
        if (this.currentPlayerId < this.players.length) {
          this.button.disabled = true;
          this.flipped = false;
          setTimeout(() => {
            this.timeoutDisable(1000);
            this.button.text = 'Ok!';
            this.state = ShowRoleState.PASS_DEVICE;
            this.currentPlayer = this.players[this.currentPlayerId++];
          }, 400 );
        } else {
          console.warn('goto game start');
        }
        break;
    }
  }

  private timeoutDisable(timeout = 2000) {
    this.button.disabled = true;
    window.setTimeout(() => {
      this.button.disabled = false;
    }, timeout);
  }

  private created() {
    this.currentPlayer = this.players[this.currentPlayerId++];
    this.timeoutDisable();
  }
}
</script>

<style scoped lang="scss">
  /deep/ .sh-card.sh-card--active .sh-card-inner {
    transform: rotateY(180deg);
  }
</style>