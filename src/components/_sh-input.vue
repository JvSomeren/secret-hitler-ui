<template>
  <input
    type="text"
    class="sh-input"
    :class="{'sh-input--disabled': disabled}"
    :placeholder="placeholder"
    v-on="inputListeners">
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Input extends Vue {
  @Prop({type: Boolean, default: false})
  private disabled?: boolean;

  @Prop({type: String, default: ''})
  private placeholder?: string;

  @Prop({default: '1'})
  private value?: any;

  get inputListeners() {
    const vm = this;

    return Object.assign({},
      this.$listeners,
      {
        input: (event: any) => {
          vm.$emit('input', event.target.value);
        },
      },
    );
  }
}
</script>

<style scoped lang="scss">
  .sh-input {
    background-color: #FDE1C0;
    border-radius: 8px;
    border: none;

    min-width: 150px;
    padding: 12px 15px;
    margin-bottom: 16px;

    position: relative;

    color: #454545;
    font-size: 20px;
    outline: none;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);

    &::placeholder {
      color: #767676;
    }
  }
</style>