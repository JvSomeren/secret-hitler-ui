<template>
  <section class="main">
    <ShBack gotoHome clearCache>
      X Exit
    </ShBack>

    <div class="sh-player__header">
      <template v-if="state === ShowRoleState.PASS_DEVICE">
        <h3 class="sh-helper-top">Pass the device to</h3>
        <h1 class="sh-player--name">{{ currentPlayer.name }}</h1>
      </template>

      <template v-else-if="state === ShowRoleState.PLAYER_HAS_DEVICE">
        <h1 class="sh-player--name">{{ currentPlayer.name }}</h1>
        <h3>press the button below to view your role</h3>
      </template>

      <template v-else-if="state === ShowRoleState.SHOWING_ROLE">
        <h1 class="sh-player--name">{{ currentPlayer.name }}</h1>
      </template>
    </div>

    <template
      v-if="state === ShowRoleState.PLAYER_HAS_DEVICE
        || state === ShowRoleState.SHOWING_ROLE">
      <ShCard
        light
        :class="{
          'sh-card-liberal': currentPlayer.role.partyMembership === PartyMembership.Liberal,
          'sh-card-fascist': currentPlayer.role.partyMembership === PartyMembership.Fascist,
        }"
        :flipped="flipped">
        <template v-slot:default>
          <Decal />
        </template>

        <template v-slot:back>
          <h3>YOUR SECRET ROLE</h3>
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
import {Player, SecretRole, PartyMembership} from '@/state/modules/Standalone/types';
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

  @standalone.Action('navigate')
  private navigate!: any;

  private SecretRole = SecretRole;
  private PartyMembership = PartyMembership;
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
        this.button.disabled = true;
        this.flipped = false;
        setTimeout(() => {
          if (this.currentPlayerId < this.players.length) {
            this.timeoutDisable(1000);
            this.button.text = 'Ok!';
            this.state = ShowRoleState.PASS_DEVICE;
            this.currentPlayer = this.players[this.currentPlayerId++];
          } else {
            this.navigate('standalone:preGame');
          }
        }, 400 );
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
  $liberal-blue: #698176;
  $fascist-red: #f2654b;

  .sh-helper-top {
    margin-top: 10px;
  }

  .sh-player__header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-height: 120px;
    padding: 12px;
    box-sizing: border-box;

    text-align: center;
    text-transform: uppercase;

    .sh-player--name {
      text-transform: initial;
    }
  }

  /deep/ .sh-card {
    margin-bottom: 20px;

    &.sh-card--active .sh-card-inner {
      transform: rotateY(180deg);
    }

    .sh-card-back svg {
      width: calc(90%);
      height: unset;
      padding: 12px;
    }

    &.sh-card-liberal .sh-card-back svg {
      fill: $liberal-blue;
    }

    &.sh-card-fascist .sh-card-back svg {
      fill: $fascist-red;
    }
  }
</style>