<template lang="pug">
#container.full-width
  q-card.bg-light.q-pa-md
    .row.justify-between
        .subtitle.text-dark {{ $t('pages.buy.confirmPurchase') }}
        //- green-flat-btn(:label="$t('pages.general.close')" v-close-popup)
    .row.justify-center.q-mt-md
        .col-10.q-gutter-y-xs
            .text-bold.text-dark.text-center.text-uppercase {{ $t('pages.buy.amountToBuy') }}
            .row.justify-center
              .text-h4.text-dark.text-center {{ formatSeeds }}
              .text-bold.text-dark.text-center.text-uppercase.self-end.q-pb-xs.q-ml-xs {{ $t('pages.sell.seeds') }}
            q-separator.q-mb-sm(color="warning")
    .row.justify-center
        .col-10.q-gutter-y-xs
            .text-bold.text-dark.text-center.text-uppercase {{ $t('pages.buy.amountToPay') }}
            .row.justify-center
              .text-h4.text-dark.text-center {{ fiatValue }}
              .text-bold.text-dark.text-center.text-uppercase.self-end.q-pb-xs.q-ml-xs {{ this.currentFiatCurrency.toUpperCase() }}
    #exRate.q-mt-md
      .hint.text-dark {{$t('pages.sell.exchangeRate')}}
      .hint.text-dark {{$t('pages.sell.exchangeRateEqual', { amount: `${exchange} ${this.currentFiatCurrency.toUpperCase()}` })}}
    .row.q-gutter-y-md.q-mt-xs
        q-btn.full-width(
            :label="$t('common.buttons.confirm')"
            color="accent"
            @click="$emit('confirm')"
        )
        q-btn.full-width(
            :label="$t('common.buttons.cancel')"
            color="negative"
            v-close-popup
        )
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'confirm-buy',
  props: {
    seeds: {},
    percentage: {},
    exchange: {}
  },
  computed: {
    ...mapGetters('accounts', ['currentFiatCurrency', 'pricePerSeedOnUSD']),
    formatSeeds () {
      return Number.parseFloat(this.seeds).toFixed(4)
    },
    fiatValue () {
      // return (this.seeds * (this.pricePerSeedOnUSD * (this.percentage / 100))).toFixed(2)
      return (this.parseSeedsToCurrentFiat(this.seeds) * (this.percentage / 100)).toFixed(2)
      // const fiatValueOnUSD = Number.parseFloat(this.seeds) / this.pricePerSeedOnUSD
      // console.log('fiatValueOnUSD', fiatValueOnUSD)
      // let fiatValue = fiatValueOnUSD * (this.percentage / 100)
      // return fiatValue.toFixed(4)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
