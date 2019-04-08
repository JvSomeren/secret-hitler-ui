<template>
  <nav
    class="sh-navbar"
    v-if="showNavbar"
    :class="{ 'sh-navbar--float': float }">
    <div class="sh-navbar-item sh-navbar-back__container">
      <ShBack
        v-if="showBack"
        :gotoHome="backType === NavbarBackType.GOTO_HOME"
        :endPrompt="backType === NavbarBackType.END_PROMPT"
        :endGame="backType === NavbarBackType.END_GAME" />
    </div>

    <div class="sh-navbar-state__container">
      <span v-if="showStatus">{{ statusText }}</span>
    </div>

    <div class="sh-navbar-info__container">
      <GameInfoDrawer
        v-if="showInfo" />
    </div>
  </nav>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Getter} from 'vuex-class';
import {NavbarBackType} from '@/route/types';
import GameInfoDrawer from '@/components/GameInfoDrawer.vue';

@Component({
  components: {
    GameInfoDrawer,
  },
})
export default class Navbar extends Vue {
  @Getter('standalone/gameStatus')
  private status!: string;

  private NavbarBackType = NavbarBackType;

  get showNavbar() {
    if (!this.$route.meta.hasOwnProperty('navbar')) return false;
    if (this.$route.meta.navbar.hasOwnProperty('show')) return this.$route.meta.navbar.show;

    return !!this.$route.meta.navbar;
  }

  get float() {
    if (!this.$route.meta.hasOwnProperty('navbar')) return false;
    if (!this.$route.meta.navbar.hasOwnProperty('float')) return false;

    return this.$route.meta.navbar.float;
  }

  get showBack() {
    if (!this.$route.meta.hasOwnProperty('navbar')) return false;
    if (!this.$route.meta.navbar.hasOwnProperty('back')) return false;

    return !!this.$route.meta.navbar.back;
  }

  get backType() {
    return this.$route.meta.navbar.back;
  }

  get showStatus() {
    if (!this.$route.meta.hasOwnProperty('navbar')) return false;
    if (!this.$route.meta.navbar.hasOwnProperty('status')) return false;

    return this.$route.meta.navbar.status;
  }

  get statusText() {
    if (!this.showStatus) return '';
    if (typeof this.$route.meta.navbar.status === 'string') return this.$route.meta.navbar.status;

    return this.status;
  }

  get showInfo() {
    if (!this.$route.meta.hasOwnProperty('navbar')) return false;
    if (!this.$route.meta.navbar.hasOwnProperty('info')) return false;

    return this.$route.meta.navbar.info;
  }
}
</script>

<style scoped lang="scss">
  .sh-navbar {
    height: 40px;
    display: flex;
    align-items: center;

    text-align: center;

    &--float {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    &-back {
      &__container {
        flex: 1;
      }
    }

    &-state {
      &__container {
        flex: 3;
      }
    }

    &-info {
      &__container {
        flex: 1;
      }
    }
  }
</style>