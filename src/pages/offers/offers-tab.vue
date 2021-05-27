<template lang="pug">
//- #container.full-width
div.full-width
  q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: 'home' })")
  .row.justify-between
    .subtitle.text-white.q-mt-md {{ $t('pages.offers.offers') }}
    green-flat-btn(:label="$t('common.buttons.filter')")
  q-tabs(
    v-model="tab"
    active-color="accent"
    flat
  )
    q-tab(name="buy" :label="$t('pages.offers.buy')")
    q-tab(name="sale" :label="$t('pages.offers.sale')")

  q-separator

  q-tab-panels(v-model="tab" animated).bg-primary
    q-tab-panel(name="buy")
      //- | Panel to buy
      #offers(v-if="offers")
        #items(v-for="offer in offers")
          offer-buy-item(:offer="offer")
    q-tab-panel(name="sale")
      | Panel to sell
  //- #offers(v-if="offers && offers.rows")
  //-   #items(v-for="offer in offers.rows")
  //-     offer-item(:offer="offer")
</template>

<script>
// import { mapActions } from 'vuex'
import OfferBuyItem from './components/offer-buy-item'
export default {
  name: 'offfers-screen',
  components: { OfferBuyItem },
  data () {
    return {
      offers: [
        {
          offerer: 'Roman Butt',
          amount: '16.00 SEEDS',
          memo: '$13.50 USD'
        }
      ],
      tab: 'buy'
    }
  }
}
</script>

<style lang="sass" scoped>
  .q-tab-panel
    padding-left: 0  !important
    padding-right: 0 !important
</style>
