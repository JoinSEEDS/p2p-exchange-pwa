<template lang="pug">
  .customBtn.redBtn.relative-position.cursor-pointer(v-ripple @click="$emit('click')")
    .container-icon
      .icon-dw
    .container-label.noselect
      .text-subtitle1.label.noselect {{ $t('pages.deposit.depositWithdraw') }}
</template>

<script>
export default {
  name: 'custom-dw-btn'
}
</script>

<style lang="sass" scoped>
#container
  position: relative
  display: block
.container-icon
  padding: 2px
  padding-top: 5px
  background-color: rgba(0, 0, 0, 0.2)
  flex: 0.5
  text-align: center

.customBtn
  display: flex
  flex-direction: row
  background-color: #1F992A
  border-radius: 8px

.icon-dw
  background-image: url('./icons/wallet.svg')
  background-repeat: no-repeat
  background-size: cover
  display: inline-block
  width: 30px
  height: 30px

.container-label
  display: block
  text-align: center
  height: 40px
  flex: 2
  user-select: none

.label
  line-height: 45px
  font-weight: bold
  user-select: none
  font-size: 10px
</style>
