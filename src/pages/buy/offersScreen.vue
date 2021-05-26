<template lang="pug">
#container
  q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: 'dashboard' })")
  .row.justify-between
    .subtitle.text-white.q-mt-md {{ $t('pages.buy.buySeeds') }}
    green-flat-btn(:label="$t('common.buttons.filter')")
  #offers(v-if="offers && offers.rows")
    #items(v-for="offer in offers.rows")
      offer-item(:offer="offer")
</template>

<script>
import { mapActions } from 'vuex'
import OfferItem from '~/pages/buy/components/offerItem'
export default {
  name: 'buyScreen',
  components: { OfferItem },
  data () {
    return {
      offers: undefined
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    ...mapActions('buyOffers', ['getOffers']),
    async loadData () {
      this.offers = await this.getOffers({ offset: 0, limit: 100 })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
