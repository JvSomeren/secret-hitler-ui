<template>
  <div>
    <section class="main">
      <template v-if="state === VetoState.PASS_DEVICE">
        <PassDevice
          :player="president"
          @passed="_passed" />
      </template>

      <template v-else>
        <div class="sh-header">
          <h2>DO YOU WISH TO ACCEPT THE REQUEST TO VETO?</h2>
        </div>

        <div class="sh-bottom sh-row">
          <ShButton
            :disabled="disabled"
            @click.native="_click(false)">Reject</ShButton>

          <ShButton
            :disabled="disabled"
            @click.native="_click(true)">Accept</ShButton>
        </div>
      </template>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PassDevice from '@/components/PassDevice.vue';
import {namespace} from 'vuex-class';
import {GameStatus, Player} from '@/state/modules/Standalone/types';

const standalone = namespace('standalone');

enum VetoState {
  PASS_DEVICE,
  DECIDING_VETO,
}

@Component({
  components: {
    PassDevice,
  },
})
export default class Veto extends Vue {
  @standalone.State((state) => state.game.president)
  private president!: Player;

  @standalone.Action('veto')
  private veto!: any;

  @standalone.Action('navigate')
  private navigate!: any;

  private VetoState = VetoState;

  private disabled = true;
  private state = VetoState.PASS_DEVICE;

  private _passed() {
    setTimeout(() => {
      this.disabled = false;
    }, 1000);
    this.state = VetoState.DECIDING_VETO;
  }

  private _click(accepted: boolean) {
    if (this.disabled) return;

    if (accepted) {
      this.veto();
    } else {
      this.navigate({
        routeName: 'standalone:chancellorDiscardPolicy',
        status: GameStatus.CHANCELLOR_DISCARDING_POLICY,
      });
    }
  }
}
</script>

<style scoped lang="scss">
  h2 {
    text-align: center;
  }

  .sh-header {
    padding: 12px;
    margin-top: 10px;
  }
</style>