<template>
  <section class="header header-logo">
    <LogoVertical v-if="vertical || !horizontal" class="logo logo-vertical" />
    <LogoHorizontal v-else-if="horizontal" class="logo logo-horizontal" />
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LogoVertical from '@/assets/logo-vertical.svg';
import LogoHorizontal from '@/assets/logo-horizontal.svg';

@Component({
  components: {
    LogoVertical,
    LogoHorizontal,
  },
})
export default class HeaderLogo extends Vue {
  @Prop({type: Boolean, default: false})
  private vertical?: boolean;

  @Prop({type: Boolean, default: false})
  private horizontal?: boolean;

  private validateProps() {
    if (process.env.NODE_ENV === 'production') return;

    if (this.vertical && this.horizontal) {
      return console.warn(
        `Invalid <ShHeaderLogo> props:\n\n${JSON.stringify(
          this.$props,
          null,
          2,
        )}\n\nEither an \`vertical\` or an \`horizontal\` can be passed, not both.`,
      );
    }
  }

  private created() {
    this.validateProps();
  }
}
</script>

<style scoped lang="scss">
  .header-logo {
    .logo-vertical {
      height: 100px;
    }
  }
</style>