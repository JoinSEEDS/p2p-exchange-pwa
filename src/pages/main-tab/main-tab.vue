<template lang="pug">
  #container.q-gutter-y-md
    .row.justify-center
      .col-xs-12.col-sm-10.col-md-8
        card-balance
    .row.q-mt-sm.q-col-gutter-lg
        .col
          custom-sell-btn(@click="goToSellScreen")
        .col
          custom-buy-btn
    .activity-component
      recent-activity-view
</template>

<script>
import CardBalance from './components/card-balance'
import CustomSellBtn from './components/custom-sell-btn'
import CustomBuyBtn from './components/custom-buy-btn'
import RecentActivityView from './components/recent-activity-view'

export default {
  name: 'main-tab',
  components: { CardBalance, CustomSellBtn, CustomBuyBtn, RecentActivityView },
  methods: {
    goToSellScreen () {
      console.log('goToSellScreen')
      this.$router.push({ name: 'sell' })
    }
  }
}
</script>

<style lang="sass" scoped>
#container
  // background: $accent
  flex: 1
  display: flex
  flex-direction: column
.activity-component
  flex: 1
</style>
