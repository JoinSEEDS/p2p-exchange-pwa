<template lang="pug">
  #container
    .row.justify-between
        .text-h6 {{ $t('pages.mainTab.actions') }}
    .row.q-mt-md
      q-btn(
        :label="$t('pages.deposit.depositWithdraw')"
        color="accent"
        no-caps
        @click="$emit('clickOnDeposit')"
      ).full-width.custom-round.q-my-sm.custom-btn
      custom-sell-btn(@click="goToSellScreen" v-if="userCanSell").full-width.q-my-sm
      custom-buy-btn(@click="goToBuyScreen").full-width.q-my-sm

    //-     .container-view-btn(v-ripple v-if="listRecentActivity")
    //-         .view-btn.self-center {{ $t('pages.mainTab.viewAll') }}
    //- #list.row
    //-     .empty-list.self-center.col.items-center
    //-         .row.justify-center.q-mb-md
    //-             .fiat-icon.text-center
    //-         .empty-label {{ $t('pages.mainTab.makeYour') }}
    //-         .empty-label {{ $t('pages.mainTab.firstTransaction').toUpperCase() }}
</template>

<script>
import CustomSellBtn from './custom-sell-btn'
import CustomBuyBtn from './custom-buy-btn'
import { mapGetters } from 'vuex'

export default {
  name: 'recent-activity-view',
  components: { CustomSellBtn, CustomBuyBtn },
  data () {
    return {
      listRecentActivity: undefined
    }
  },
  computed: {
    ...mapGetters('accounts', ['userCanSell'])
  },
  methods: {
    goToSellScreen () {
      this.$router.push({ name: 'sell' })
    },
    goToBuyScreen () {
      this.$router.push({ name: 'sellOffers' })
    }
  }
}
</script>

<style lang="sass" scoped>
.custom-btn
  height: 45px
</style>
