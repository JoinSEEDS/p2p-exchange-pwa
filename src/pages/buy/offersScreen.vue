<template lang="pug">
#container
  q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: 'dashboard' })")
  .row.justify-between
    .subtitle.text-white.q-mt-md {{ $t('pages.buy.buySeeds') }}
    green-flat-btn(:label="$t('common.buttons.filter')" @click="showFilter = true")
  #containerScroll(ref="scrollTarget")
    q-infinite-scroll.infiniteScroll(@load="onLoad" :offset="510" :scroll-target="$refs.scrollTarget")
      #items(v-for="offer in offersList.rows")
        offer-item(:offer="offer" v-if="offer.seller !== account" :filters="filters")
  #modals
    q-dialog(v-model="showFilter" transition-show="slide-up" transition-hide="slide-down" persistent)
      filter-offer(v-model.sync="filters" @success="onFilterChange")
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OfferItem from '~/pages/buy/components/offerItem'
import FilterOffer from '~/pages/buy/components/filterOffer'

export default {
  name: 'buyScreen',
  components: { OfferItem, FilterOffer },
  data () {
    return {
      showFilter: false,
      scrollTarget: undefined,
      rowsPerLoad: 4,
      limit: 0,
      offset: 0,
      offersList: {
        more: true,
        rows: [],
        nextKey: undefined
      },
      filters: {
        timeZone: 'all',
        fiatCurrency: 'all'
      }
    }
  },
  beforeMount () {
    this.limit = this.rowsPerLoad
  },
  computed: {
    ...mapGetters('accounts', ['account'])
  },
  methods: {
    ...mapActions('buyOffers', ['getSellOffers']),
    onFilterChange (filters) {
      this.showFilter = false
      // this.filters = filters
    },
    async onLoad (index, done) {
      console.log('onLoad', this.offersList.more)
      if (this.offersList.more) {
        const { rows, more, next_key: nextKey } = await this.getSellOffers({
          limit: 2,
          indexPosition: 11,
          nextKey: this.offersList.nextKey
        })
        if (rows) {
          // console.log('rows', rows)
          this.offersList.rows = this.offersList.rows.concat(rows)
        }
        this.offersList.more = more
        this.offersList.nextKey = nextKey
        this.offset = this.limit
        this.limit = this.limit + this.rowsPerLoad
        done()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
#container
  display: flex
  flex-direction: column

#containerScroll
  overflow: auto
  flex: 1
  max-height: 650px
@media screen and (max-width: $breakpoint-mobile)
  #containerScroll
    max-height: 580px
</style>
