<template lang="pug">
.row.container-view-btn(v-ripple @click="$emit('click')")
    .view-btn.self-center.cursor-pointer.noselect {{ label }}
</template>

<script>
export default {
  name: 'green-flat-btn',
  props: {
    label: {
      type: String,
      default: 'View All'
    }
  }
}
</script>

<style lang="sass" scoped>
.container-view-btn
    position: relative
.view-btn
    font-size: 14px
    font-style: normal
    font-weight: 500
    line-height: 17px
    letter-spacing: 0em
    color: $accent
    padding: 5px
    border-radius: 10px
</style>
