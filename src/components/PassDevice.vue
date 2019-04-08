<template>
  <div class="sh-pass-device">
    <div class="sh-player__header">
      <h3 class="sh-helper-top">Pass the device to</h3>
      <h1 class="sh-player--name">{{ playerName }}</h1>
    </div>

    <ShButton
      class="sh-bottom"
      :disabled="disabled"
      @click.native="_click">Ok!</ShButton>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import {Player} from '@/state/modules/Standalone/types';

@Component({})
export default class PassDevice extends Vue {
  @Prop()
  private player!: Player;

  private disabled = true;

  @Emit('passed')
  private passed() { return; }

  get playerName() {
    if (this.player === null) return '';

    return this.player.name;
  }

  private _click() {
    if (this.disabled) return;

    this.passed();
  }

  private mounted() {
    setTimeout(() => {
      this.disabled = false;
    }, 1000);
  }
}
</script>

<style scoped lang="scss">
  .sh-pass-device {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

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
</style>