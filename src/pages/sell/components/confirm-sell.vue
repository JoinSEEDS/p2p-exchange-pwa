<template lang="pug">
#container.full-width
  q-card.bg-light.q-pa-md
    .row.justify-between
        .subtitle.text-dark {{ $t('pages.sell.confirmSale') }}
        //- green-flat-btn(:label="$t('pages.general.close')" v-close-popup)
    .row.justify-center.q-mt-md
        .col-5.q-gutter-y-xs
            .text-h4.text-dark.text-center {{ formatSeeds }}
            .text-bold.text-dark.text-center.text-uppercase {{ $t('pages.sell.seeds') }}
            q-separator.q-mb-sm(color="warning")
    .row.justify-center
        .col-5.q-gutter-y-xs
            .text-h4.text-dark.text-center {{ fiatValue }}
            .text-bold.text-dark.text-center.text-uppercase {{ this.currentFiatCurrency.toUpperCase() }}
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
  name: 'confirm-sell',
  props: {
    seeds: {},
    percentage: {}
  },
  computed: {
    ...mapGetters('accounts', ['currentFiatCurrency', 'pricePerSeedOnUSD']),
    formatSeeds () {
      return Number.parseFloat(this.seeds).toFixed(4)
    },
    fiatValue () {
      const fiatValueOnUSD = Number.parseFloat(this.seeds) / this.pricePerSeedOnUSD
      console.log('fiatValueOnUSD', fiatValueOnUSD)
      let fiatValue = fiatValueOnUSD * (this.percentage / 100)
      return fiatValue.toFixed(4)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
