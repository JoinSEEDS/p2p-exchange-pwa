<template lang="pug">
#container
  .row.justify-between
    .subtitle.text-white.q-mt-md {{ $t('pages.offers.offers') }}
    //- green-flat-btn.self-center(:label="$t('common.buttons.filter')")
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
      my-buy-offers
    q-tab-panel(name="sale")
      my-sell-offers
</template>

<script>
import MyBuyOffers from './tabs/myBuyOffers.vue'
import MySellOffers from './tabs/mySellOffers.vue'
// import { PublicFields, RootFields } from '@smontero/ppp-common'
import { mapActions } from 'vuex'

export default {
  name: 'main-offers-screen',
  components: { MyBuyOffers, MySellOffers },
  data () {
    return {
      tab: 'buy'
    }
  },
  async mounted () {
    if (this.subTab) this.tab = this.subTab
    let res = await this.searchProfiles({ search: 'edwintestne1', lastEvaluatedKey: 0, limit: 100 })
    console.log(res)
  },
  computed: {
    subTab () {
      return this.$route.params.subTab
    }
  },
  methods: {
    ...mapActions('profilesppp', ['searchProfiles'])
  }
}
</script>

<style lang="sass" scoped>
  .q-tab-panel
    padding-left: 0  !important
    padding-right: 0 !important
</style>
