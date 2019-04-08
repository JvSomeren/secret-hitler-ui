<template>
  <div v-if="!displayPrompt" class="sh-back" @click="_click">
    <slot v-if="!!$slots.default" />
    <span v-else-if="text !== ''">{{ _text }}</span>
    <template v-else v-html="_text">
      <Clear v-if="endPrompt || endGame" />
      <ArrowBack v-else />
      <span>{{ _text }}</span>
    </template>
  </div>

  <section v-else class="sh-prompt__wrapper">
    <div class="sh-back sh-back-cancel" @click="cancel">
      <ArrowBack />
      <span>Cancel</span>
    </div>

    <div class="sh-prompt">
      <h2>Do you want to close or end the game?</h2>

      <div class="sh-bottom sh-prompt-buttons">
        <ShButton @click.native="navigateHome">Close game</ShButton>
        <ShButton
          :disabled="endGameButtonDisabled"
          @click.native="_endGame">End game</ShButton>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Mutation} from 'vuex-class';
import ArrowBack from '@/assets/arrow-back.svg';
import Clear from '@/assets/clear.svg';

@Component({
  components: {
    ArrowBack,
    Clear,
  },
})
export default class Back extends Vue {
  @Prop({type: String, default: ''})
  private text?: string;

  @Prop({type: Boolean, default: false})
  private gotoHome?: boolean;

  @Prop({type: Boolean, default: false})
  private endPrompt?: boolean;

  @Prop({type: Boolean, default: false})
  private endGame?: boolean;

  @Mutation('standalone/RESET_STATE')
  private resetStateStandalone!: any;

  private displayPrompt = false;
  private endGameButtonDisabled = false;

  get _text() {
    if (this.text !== '') return this.text;
    if (this.gotoHome) return 'HOME';
    if (this.endPrompt
      || this.endGame) return 'EXIT';

    return 'BACK';
  }

  private _endGame() {
    if (this.endGameButtonDisabled) return;
    if (this.$router.currentRoute.name!.split(':')[0] === 'standalone') {
      this.navigateHome();
      this.resetStateStandalone();
    } else return;
  }

  private showPrompt() {
    this.endGameButtonDisabled = true;
    setTimeout(() => {
      this.endGameButtonDisabled = false;
    }, 1000);
    this.displayPrompt = true;
  }

  private navigateHome() {
    this.$router.replace({ name: 'home' });
  }

  private _click() {
    if (this.endGame) return this._endGame();
    if (this.endPrompt) return this.showPrompt();
    if (this.gotoHome) return this.navigateHome();

    this.$router.back();
  }

  private cancel() {
    this.displayPrompt = false;
  }
}
</script>

<style scoped lang="scss">
  $bg-color: #FBB969;

  .sh-back {
    display: flex;
    align-items: center;
    font-family: 'Courier', Courier, monospace;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);

    svg {
      width: unset;
      height: 17px;
      padding-left: 3px;
    }

    span {
      font-size: 18px;
    }
  }

  .sh-prompt__wrapper {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;

    background-color: $bg-color;
    width: calc(100% - 12px);
    height: 100%;
    padding: 0 6px 0 6px;

    .sh-back-cancel {
      position: absolute;
      top: 0;
      left: 0;

      height: 40px;
      display: flex;
      align-items: center;
    }
  }

  .sh-prompt {
    display: flex;
    flex-direction: column;

    height: 30%;

    h2 {
      text-align: center;
    }

    .sh-prompt-buttons {
      display: flex;
      justify-content: space-around;
    }
  }
</style>