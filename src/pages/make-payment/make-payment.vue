<template lang="pug">
  #container.text-white.tab-container(v-if="offer")
    q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: 'dashboard', params: { tab: 'transactions'} })")
    .row
      .subtitle.text-white.q-mt-md {{ $t('pages.make_payment.make_payment') }}
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
    .row.q-my-xl
      .text-white {{ $t('pages.make_payment.to_complete') }}
      .text-accent.more-info.cursor-pointer {{ $t('pages.make_payment.more_info') }}
    q-btn(color="blue" v-if="hasPypal" @click="copyPaypal()").full-width.q-my-sm.custon-btn
      template(v-slot:default).flex-justify-between.cursor-pointer
        .col-2.bg-white.flex.align-center.justify-center.btn-img-container
          q-img(src="~/assets/paypal.png").self-center.btn-img
        label.col-9.cursor-pointer {{ paypal }}
        q-icon(name="content_copy").col-1
        q-tooltip(:offset="[-30, 30]" self="top middle" anchor="top right").bg-amber.text-black.shadow-4 {{ $t('pages.make_payment.copy') }}
    q-btn(:label="$t('pages.make_payment.confirm')" color="positive" @click="confirmPaymnt()").full-width.q-my-sm.custon-btn
    //- q-btn(label="Report arbtration" color="warning").full-width.q-my-sm.custon-btn
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'make-payment',
  data () {
    return {
      offer: undefined,
      copied: true
    }
  },
  computed: {
    ...mapGetters('accounts', ['currentFiatCurrency']),
    offerId () {
      return this.$route.params.id
    },
    hasPypal () {
      return !!this.offer.payment_methods.find(el => el.key === 'paypal')
    },
    paypal () {
      return this.offer.payment_methods.find(el => el.key === 'paypal').value
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
  mounted () {
    this.getOfferData()
  },
  methods: {
    ...mapActions('buyOffers', ['getOffer', 'confirmPayment']),
    async getOfferData () {
      this.offer = await this.getOffer(this.offerId)
      console.log(this.offer)
      // console.log('get data of ', this.offerId)
    },
    copyPaypal () {
      // console.log('copied!')
      this.copied = true
      navigator.clipboard.writeText(this.paypal)
      setTimeout(() => {
        this.copied = false
      }, 2000)
    },
    async confirmPaymnt () {
      let res = await this.confirmPayment({ buyOfferId: this.offerId })
      console.log(res)
    }
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
