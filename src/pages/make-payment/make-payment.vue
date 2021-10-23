<template lang="pug">
  #container.text-white.tab-container(v-if="offer")
    q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: 'dashboard', params: { tab: 'transactions'} })")
    .row
      .subtitle.text-white.q-mt-md {{ $t('common.buttons.confirm_payment') }}
    .row.q-my-md
      img.avatar-icon.self-center(src="~/assets/seedIcon.png")
      .col.q-px-md.q-py-md
          .text-white #[strong {{ this.offer.seller }}] {{ $t('pages.make_payment.has_accepted') }}
    .row
      .col-12.text-h4.text-center {{ quantity }}
      .col-12.text-h6.text-center {{ currency }}
    hr.custom-separator
    .row
      .col-12.text-h4.text-center ${{ equivalentFiat }}
      .col-12.text-h6.text-center {{ currentFiatCurrency.toUpperCase() }}
      //- .text-accent.more-info.cursor-pointer {{ $t('pages.make_payment.more_info') }}
    q-card.bg-blue.q-pa-sm.q-mt-sm(v-if="paymentMethod" round)
      //- .text-subtitle1.text-bold.text-capitalize Seller's payment details
      .text-subtitle2.text-capitalize.text-center {{ paymentMethod.prefPaymentMeth }} ({{ paymentMethod.prefPaymentMethType }})
      .text-subtitle1.text-bold.text-center {{ paymentMethod.prefPaymentMethValue }}
    .row.q-mb-md.q-mt-xs
      .text-white {{ $t('pages.make_payment.to_complete') }}
    //- q-btn(color="blue" v-if="hasPaymentMethod" no-caps).full-width.q-my-sm.custon-btn
    //-   template(v-slot:default).flex-justify-between.cursor-pointer
    //-     .col-2.bg-white.flex.align-center.justify-center.btn-img-container
    //-       q-img(src="~/assets/paypal.png").self-center.btn-img
    //-     label.col-9.cursor-pointer {{ paymentMethod.prefPaymentMeth }}
    //-     q-icon.animated-icon.cursor-pointer.linkBtn(
    //-       name="open_in_new" @click="openPayPalLink"
    //-     )
    q-btn(:label="$t('common.buttons.confirm_payment')" color="positive" @click="makePayment()" no-caps).full-width.q-my-sm.custon-btn
    //- q-btn(label="Report arbtration" color="warning").full-width.q-my-sm.custon-btn
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'make-payment',
  data () {
    return {
      offer: undefined,
      copied: true,
      paymentMethod: ''
    }
  },
  computed: {
    ...mapGetters('accounts', ['currentFiatCurrency']),
    offerId () {
      return this.$route.params.id
    },
    hasPaymentMethod () {
      return !!this.paymentMethod
    },
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
    }
  },
  async mounted () {
    const paymentData = await this.receiveMessage({ buyOfferId: this.offerId })
    this.paymentMethod = JSON.parse(paymentData)
    this.getOfferData()
  },
  methods: {
    ...mapActions('buyOffers', ['getOffer', 'payOffer']),
    ...mapActions('encryption', ['receiveMessage']),
    async getOfferData () {
      this.offer = await this.getOffer(this.offerId)
    },
    async makePayment () {
      await this.payOffer({ buyOfferId: this.offerId })
      await this.showSuccessMsg(this.$root.$t('pages.make_payment.success_pay'))
      this.$router.replace({ name: 'dashboard', params: { tab: 'transactions' } })
    }
    // openPayPalLink () {
    //   window.open(this.paypal)
    // }
  }
}
</script>

<style lang="sass">
  .tab-container
    padding: 30px 30px !important
  .custom-separator
    color: $warning
    width: 50%
    margin: 20px auto
  .more-info
    text-decoration: underline
    text-text-decoration-color: $accent
  .q-btn__wrapper
    padding: 0px !important
  .btn-img
    width: 50px
  .custon-btn
    height: 50px
    border-radius: 5px
  .btn-img-container
    height: 100% !important
    border-top-left-radius: 5px
    border-bottom-left-radius: 5px
</style>
