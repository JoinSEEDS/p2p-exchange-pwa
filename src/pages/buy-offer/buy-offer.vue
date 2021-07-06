<template lang="pug">
  #container.text-grey3.tab-container
    q-card.q-pa-md.bg-light.q-gutter-md
      .row.justify-between.q-mt-none
        .subtitle.text-grey3 {{ $t('pages.buy_offer.buy_offer') }}
        green-flat-btn(:label="$t('pages.general.close')" v-close-popup)
      .row.q-my-xs
        img.avatar-icon.self-center(src="~/assets/seedIcon.png")
        .col.q-px-md.q-py-md
            .text-grey3 #[strong {{ offer.buyer }}] {{ $t('pages.buy_offer.buy_token', {token: 'seed'}) }}
      .row
        .col
          .text-grey3.text-caption #[strong {{ $t('pages.buy_offer.reputation') + ':' }}]
          buy-offer-reputation
        .col
          .text-grey3.text-caption #[strong {{ $t('pages.buy_offer.total_transaction') + ':' }}]
          .text-grey3.text-caption 1,239.00
      .row.q-mb-md
        .col
          .text-grey3.text-caption #[strong {{ $t('pages.buy_offer.user') + ':' }}]
          .text-grey3.text-caption Resident
        .col
          .text-grey3.text-caption #[strong {{ $t('pages.buy_offer.time_zone') + ':' }}]
          .text-grey3.text-caption GMT - 5
      .row
        .col-12.text-h4.text-center.text-dark ${{ quantity }}
        .col-12.text-h6.text-center.text-dark {{ currency }}
      q-separator.text-dark.custom-separator
      .row.q-mb-sm
        .col-12.text-h4.text-center.text-dark {{ equivalentFiat }}
        .col-12.text-h6.text-center.text-dark {{ currentFiatCurrency }}
      q-btn(label="Accept offer" color="accent" @click="showConfirmModal(true)").full-width.q-my-sm.custon-btn.custom-round
      q-btn(label="Reject offer" color="negative" @click="showConfirmModal(false)").full-width.q-my-sm.custon-btn.custom-round
      #modals
        q-dialog(v-model="showConfirm" transition-show="slide-up" transition-hide="slide-down")
          confirm-buy-offer(:offer="offer" :accept="accept")

      //- q-btn(label="Report arbtration" color="warning").full-width.q-my-sm.custon-btn
</template>

<script>
import BuyOfferReputation from './read/buy-offer-reputation'
import { mapActions, mapGetters } from 'vuex'
import ConfirmBuyOffer from './components/confirm-buy-offer.vue'

export default {
  name: 'buy-offer',
  components: { BuyOfferReputation, ConfirmBuyOffer },
  data () {
    return {
      showConfirm: false,
      accept: false
    }
  },
  props: {
    offer: Object
  },
  computed: {
    ...mapGetters('accounts', ['currentFiatCurrency']),
    quantity () {
      return this.offer.quantity.split(' ')[0]
    },
    currency () {
      return this.offer.quantity.split(' ')[1]
    },
    equivalentFiat () {
      try {
        return this.parseSeedsToCurrentFiat(this.quantity)
      } catch (e) {
        console.error(e)
        return 0
      }
    }
  },
  methods: {
    ...mapActions('buyOffers', ['acceptBuyOffer']),
    // acceptOffer () {
    //   console.log(this.offer.id)
    //   this.acceptBuyOffer({ buyOfferId: this.offer.id })
    // },
    showConfirmModal (accept) {
      this.accept = accept
      this.showConfirm = !this.showConfirm
    }
  }
}
</script>

<style lang="sass">
  .tab-container
    padding: 30px 30px !important
  .custom-separator
    // border-color: $warning
    width: 50%
    margin: 20px auto
  .more-info
    text-decoration: underline
    text-text-decoration-color: $accent
  .q-btn__wrapper
    padding: 0px !important
    // margin-top: 20px
    // margin-bottom: 20px
  .btn-img
    // height: 80%
    width: 50px
  .custon-btn
    height: 50px
  .btn-img-container
    height: 100% !important
    border-top-left-radius: 5px
    border-bottom-left-radius: 5px
</style>
