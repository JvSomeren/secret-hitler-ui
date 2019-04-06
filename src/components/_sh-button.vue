<template>
  <div
    class="sh-button"
    :class="{'sh-button--disabled': disabled}">
    <span><slot /></span>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop({type: Boolean, default: false})
  private disabled?: boolean;
}
</script>

<style scoped lang="scss">
.sh-button {
  background-color: #434343;
  border-radius: 8px;
  box-shadow: 0 6px 0 #343434;
  box-sizing: border-box;
  cursor: pointer;
  
  height: 60px;
  min-width: 150px;
  padding: 12px 15px;
  margin-bottom: 22px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  color: #fff;
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  text-decoration: none;
  outline: none;
  -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);

  &--disabled {
    background-color: #343434;
    color: #7D7D7D;
    cursor: initial;
    box-shadow: none;

    span {
      top: 0 !important;
    }
  }

  span {
    position: relative;
    top: 2px;
    transition: transform 120ms ease;
    user-select: none;
  }

  &:not(.sh-button--disabled):after {
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    top: -6px;
    left: 0;
    transition: transform 120ms ease;
    transform: translateY(0);

    border-radius: 8px;
    box-shadow: 0 6px 0 #434343;
  }

  &:not(.sh-button--disabled):hover {
    span {
      /*transform: translateY(1px);*/
    }

    &:after {
      /*transform: translateY(2px);*/
    }
  }

  &:not(.sh-button--disabled):active {
    span {
      transform: translateY(3px);
    }

    &:after {
      transform: translateY(6px);
    }
  }
}
</style>