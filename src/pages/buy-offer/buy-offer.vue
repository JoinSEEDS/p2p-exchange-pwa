<template lang="pug">
  #container.text-grey3.tab-container(v-if="offer && buyer")
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
          .text-grey3.text-caption #[strong {{ $t('pages.buy_offer.reputation') }}]:
          .text-grey3.text-caption {{ reputation }}
          //- buy-offer-reputation
        .col
          .text-grey3.text-caption #[strong {{ $t('pages.buy_offer.total_transaction') + ':' }}]
          .text-grey3.text-caption {{ equivalentFiat }} {{ currentFiatCurrency.toUpperCase() }}
      .row.q-mb-md
        .col
          .text-grey3.text-caption #[strong {{ $t('pages.buy_offer.user') + ':' }}]
          .text-grey3.text-caption {{ status }}
        .col
          .text-grey3.text-caption #[strong {{ $t('pages.buy_offer.time_zone') + ':' }}]
          .text-grey3.text-caption {{ timezone }}
      .row
        .col-12.text-h4.text-center.text-dark {{ quantity }}
        .col-12.text-h6.text-center.text-dark {{ currency }}
      q-separator.text-dark.custom-separator
      .row.q-mb-sm
        .col-12.text-h4.text-center.text-dark ${{ equivalentFiat }}
        .col-12.text-h6.text-center.text-dark {{ currentFiatCurrency.toUpperCase() }}
      .row.q-my-md
        small.text-red.text-bold(v-if="paid || accepted") {{ $t('pages.sell.confirm_payment') }}
      q-btn(
        no-caps
        v-if="pending"
        label="Accept"
        color="accent"
        @click="confOffer()"
      ).full-width.custom-round
      q-btn(no-caps v-if="pending" label="Reject" color="negative" @click="rejectOff()").full-width.q-my-sm.custom-round
      q-btn(no-caps v-if="paid || accepted" :label="$t('common.buttons.confirm_payment')" color="blue" @click="() => confirmPaym()" v-close-popup).full-width.q-my-sm.custom-round
      //- q-btn(label="Report arbtration" color="warning").full-width.q-my-sm.custon-btn
      //- #modals
      //-   q-dialog(v-model="showConfirm" transition-show="slide-up" transition-hide="slide-down")
      //-     confirm-buy-offer(:offer="offer" :accept="accept")

</template>

<script>
import BuyOfferReputation from './read/buy-offer-reputation'
import { mapActions, mapGetters } from 'vuex'
import { OfferStatus } from '~/const/OfferStatus'
import { EventBus } from '~/event-bus'

export default {
  name: 'buy-offer',
  components: { BuyOfferReputation },
  async mounted () {
    let { userData } = await this.$store.$userApi.getUserSeedsData({ accountName: this.offer.buyer })
    this.buyer = userData
  },
  data () {
    return {
      showConfirm: false,
      accept: false,
      OfferStatus,
      buyer: ''
    }
  },
  props: {
    offer: Object
  },
  computed: {
    ...mapGetters('accounts', ['currentFiatCurrency']),
    quantity () {
      return this.offer.quantity_info.find(el => el.key === 'buyquantity').value.split(' ')[0]
    },
    currency () {
      return this.offer.quantity_info.find(el => el.key === 'buyquantity').value.split(' ')[1]
    },
    equivalentFiat () {
      try {
        return this.parseSeedsToCurrentFiat(this.quantity)
      } catch (e) {
        console.error(e)
        return 0
      }
    },
    pending () {
      return this.offer.current_status === OfferStatus.BUY_OFFER_PENDING
    },
    paid () {
      return this.offer.current_status === OfferStatus.BUY_OFFER_PAID
    },
    accepted () {
      return this.offer.current_status === OfferStatus.BUY_OFFER_ACCEPTED
    },
    timezone () {
      return (this.offer.time_zone).toUpperCase()
    },
    status () {
      return this.buyer.status
    },
    reputation () {
      return this.buyer.reputation
    }
  },
  methods: {
    ...mapActions('buyOffers', ['acceptBuyOffer', 'confirmPayment', 'rejectBuyOffer']),
    ...mapActions('encryption', ['createMessage']),
    ...mapActions('profiles', ['getPaypal']),
    async confOffer () {
      try {
        this.setIsLoading(true)
        let messageData = await this.createMessage({ buyOfferId: this.offer.id, message: await this.getPaypal(), recipientAccount: this.buyer.account })
        await this.acceptBuyOffer({ buyOfferId: this.offer.id, messageData })
        EventBus.$emit('confirmOffer')
        this.showSuccessMsg(this.$root.$t('pages.offers.accept_buy_offer'))
      } catch (error) {
        console.error(error)
      }
    },
    async rejectOff () {
      try {
        await this.rejectBuyOffer({ buyOfferId: this.offer.id })
        EventBus.$emit('confirmOffer')
        this.showSuccessMsg(this.$root.$t('pages.offers.reject_buy_offer'))
      } catch (error) {
        console.error(error)
      }
    },
    async confirmPaym () {
      try {
        await this.confirmPayment({ buyOfferId: this.offer.id })
        this.showSuccessMsg(this.$root.$t('pages.offers.confirm_payment'))
        EventBus.$emit('confirmOffer')
        this.$router.replace({ name: 'dashboard', params: { tab: 'transactions', subTab: 'sale' } })
      } catch (error) {
        console.error('An error occurred while trying to confirm payment: ', error)
      }
    }
  }
}
</script>

<style lang="sass">
  .tab-container
    padding: 30px 30px !important
  .custom-separator
    width: 50%
    margin: 20px auto
  .more-info
    text-decoration: underline
    text-text-decoration-color: $accent
  .q-btn__wrapper
    padding: 0px !important
  .btn-img
    width: 50px
  .btn-img-container
    height: 100% !important
    border-top-left-radius: 5px
    border-bottom-left-radius: 5px
</style>
