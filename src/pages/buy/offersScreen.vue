<template lang="pug">
#container
  q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: 'dashboard' })")
  .row.justify-between
    .subtitle.text-white.q-mt-md {{ $t('pages.buy.buySeeds') }}
    green-flat-btn(:label="$t('common.buttons.filter')" @click="showFilter = true")
  .row.justify-start(v-if="filter.filterValue.label")
    .text-info Filtered by {{ filter.filterLabel.label }} : {{ filter.filterValue.label }}
    q-icon.q-ml-sm(name="close" color="white" @click="removeFilter")
  #offersEmpty(v-if="offersList.rows.length === 0 && loading")
    skeleton-offer-item
  q-pull-to-refresh(@refresh="refresh" :scroll-target="$refs.scrollTarget")
    #containerScroll(ref="scrollTarget")
      q-infinite-scroll.infiniteScroll(@load="onLoad" :offset="200" :scroll-target="$refs.scrollTarget" ref="customInfinite")
        #items(v-for="offer in offersList.rows")
          offer-item(:offer="offer" v-if="offer.seller !== account")
  #modals
    q-dialog(v-model="showFilter" transition-show="slide-up" transition-hide="slide-down" persistent)
      filter-offer(:filter="filter" @success="onFilterChange")
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
      loading: true,
      showFilter: false,
      scrollTarget: undefined,
      rowsPerLoad: 4,
      limit: 2,
      offersList: {
        more: true,
        rows: [],
        nextKey: undefined
      },
      filter: {
        filterLabel: {
          label: 'None',
          value: 11
        },
        filterValue: {
          label: undefined,
          value: undefined
        }
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
    ...mapActions('sellOffers', ['getSellOffers']),
    async refresh (done) {
      this.resetPagination()
      done()
    },
    removeFilter () {
      this.filter = {
        filterLabel: {
          label: 'None',
          value: 11
        },
        filterValue: {
          label: undefined,
          value: undefined
        }
      }
      this.resetPagination()
    },
    async resetPagination () {
      this.offersList = {
        more: true,
        rows: [],
        nextKey: undefined
      }
      // console.log('resetPagination')
      // this.$refs.customInfinite.stop()
      // this.onLoad()
      await this.$nextTick()
      this.$refs.customInfinite.stop()
      await this.$nextTick()
      this.$refs.customInfinite.resume()
      // this.$refs.customInfinite.poll()
    },
    onFilterChange (filter) {
      this.showFilter = false
      this.filter = filter
      this.resetPagination()
    },
    async onLoad (index, done) {
      // console.log('onLoad', this.offersList.more)
      this.loading = true
      if (this.offersList.more) {
        const { rows, more, next_key: nextKey } = await this.getSellOffers({
          limit: this.limit,
          indexPosition: this.filter.filterLabel.value,
          nextKey: this.offersList.nextKey,
          filterValue: this.filter.filterValue.value
        })
        if (rows) {
          // console.log('rows', rows)
          this.offersList.rows = this.offersList.rows.concat(rows)
        }
        this.offersList.more = more
        this.offersList.nextKey = nextKey
        this.offset = this.limit
        // this.limit = this.limit + this.rowsPerLoad
        if (done) {
          done()
        }
      }
      this.loading = false
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
