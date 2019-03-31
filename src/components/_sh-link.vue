<template>
  <ShButton
    v-if="to"
    @click.native="clickHandler(_click)"
    :disabled="disabled">
    <slot />
  </ShButton>

  <a
    v-else-if="href || file"
    :href="href || file"
    :target="!!file ? '_blank' : '_self'">
    <ShButton
      :disabled="disabled">
      <slot />
    </ShButton>
  </a>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Link extends Vue {
  @Prop([String, Location])
  private to?: string | object;

  @Prop([String])
  private href?: string;

  @Prop([String])
  private file?: string;

  @Prop({type: Boolean, default: false})
  private disabled?: boolean;

  @Prop({type: Boolean, default: false})
  private allowInsecure?: boolean;

  private clickHandler(func: any, ...args: any[]) {
    if (!this.disabled) func.apply(null, ...args.slice(1));
  }

  private _click() {
    let to: string | object = '';

    if (typeof this.to === 'object') to = this.to;
    else if (typeof this.to === 'string') {
      // check if `to` is a path or a name
      if (/^\/\w+/.test(this.to)) to = {path: this.to};
      else to = {name: this.to};
    }

    this.$router.push(to);
  }

  private validateProps() {
    if (process.env.NODE_ENV === 'production') return;

    if (this.href) {
      // Check for non-external URL in href.
      if (!/^\w+:/.test(this.href)) {
        return console.warn(
          `Invalid <ShLink> href: ${
            this.href
            }.\nIf you're trying to link to a local URL, provide at least a name or to`,
        );
      }
      // Check for insecure URL in href.
      if (!this.allowInsecure && !/^(https|mailto|tel):/.test(this.href)) {
        return console.warn(
          `Insecure <ShLink> href: ${
            this.href
            }.\nWhen linking to external sites, always prefer https URLs.
            If this site does not offer SSL, explicitly add the allowInsecure attribute on <ShLink>.`,
        );
      }
    } else {
      // Check for insufficient props.
      if (!this.file && !this.to) {
        return console.warn(
          `Invalid <ShLink> props:\n\n${JSON.stringify(
            this.$props,
            null,
            2,
          )}\n\nEither an \`to\` is required for internal links, an \`href\` for external links,\
 or an \`file\` for files.`,
        );
      }
    }
  }

  private created() {
    this.validateProps();
  }
}
</script>

<style scoped lang="scss">
  a {
    text-decoration: none;
    outline: none;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
    margin-bottom: 22px;

    &:visited {
      text-decoration: none;
    }

    & > .sh-button {
      margin-bottom: 0;
    }
  }
</style>