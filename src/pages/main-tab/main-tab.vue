<template lang="pug">
  #container
    card-balance.q-mt-md
    .row.q-mt-sm.q-col-gutter-lg
        .col
            custom-sell-btn
        .col
            custom-buy-btn
</template>

<script>
import CardBalance from './components/card-balance'
import CustomSellBtn from './components/custom-sell-btn'
import CustomBuyBtn from './components/custom-buy-btn'

export default {
  name: 'main-tab',
  components: { CardBalance, CustomSellBtn, CustomBuyBtn }
}
</script>

<style lang="sass" scoped>
</style>
