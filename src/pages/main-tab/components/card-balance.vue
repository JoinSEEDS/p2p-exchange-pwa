<template lang="pug">
#container.q-pa-md.flex
  .row
    .col-10
        .text-h5 {{ $t('pages.mainTab.seeds') }}
    .col
        .coin
  .row.q-mt-md
    .text-h6.wallet-label {{ $t('pages.mainTab.walletBalance') }}
  .text-h6.wallet-value 1244.35
  .text-h6.wallet-fiat $6,43 USD

</template>

<script>
export default {
  name: 'card-balance'
}
</script>

<style lang="sass" scoped>
#container
  background-image: url('./icons/BG.svg')
  background-repeat: no-repeat
  background-size: cover
  display: inline-block
  width: 100%
  min-height: 200px
  border-radius: 25px

.coin
  background-image: url('./icons/Coin.svg')
  background-repeat: no-repeat
  background-size: cover
  display: inline-block
  width: 50px
  height: 50px

.wallet-label
  font-size: 14px

.wallet-value
  font-size: 28px

.wallet-fiat
  font-size: 14px
//   width: 600px
//   height: 300px
</style>
