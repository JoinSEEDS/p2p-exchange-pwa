<template lang="pug">
#container
  .q-pa-md
    q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace('/offers')")
    q-form.q-gutter-md.q-mt-sm(@submit.event="onValidForm")
        .subtitle.text-white.q-mt-md {{ $t('pages.buy.offerDetail') }}
        .text-white {{ $t('pages.buy.howManySeedsWillYouBuy') }}
        .row.justify-center
          .col-9
            .text-h4.text-white.text-center {{ params.amount ? Number.parseFloat(params.amount).toFixed(4) : 0 }}
              span.text-h6.text-white.text-center.text-uppercase.q-ml-sm {{ $t('pages.sell.seeds') }}
            q-separator(color="warning")
            .text-h4.text-white.text-center {{ fiatToPay }}
              span.text-h6.text-white.text-center.text-uppercase.q-ml-sm {{ currentFiatCurrency }}
        .row.bg-warning.container-current.q-py-sm(v-if="availableSeeds")
            .q-pa-sm
              .iconSeeds
            .col-xs-10.col-sm-11.self-center
              .textLabelCurrent.q-ml-xs {{ $t('pages.buy.seedsAvailable') }}
              .textValueCurrent.text-info.q-ml-xs {{ availableSeeds }}
              .row
                .col-xs-12.col-sm-6
                  .textLabelCurrent.q-ml-xs {{ $t('pages.buy.pricePerSEED') }}
                  .textValueCurrent.text-info.q-ml-xs {{ percentageValue }} %
                .col-xs-12.col-sm-6
                  .textLabelCurrent.q-ml-xs {{ $t('pages.sell.exchangeRate') }}
                  .textValueCurrent.text-info.q-ml-xs 1 SEED = {{ exchangeRate }} {{ currentFiatCurrency.toUpperCase()}}
                  q-separator(dark)
              .text-weight-bold.text-white {{ $t('pages.buy.seller') }}: {{ sellOffer.seller }}
              .row.q-col-gutter-sm(v-if="sellerInfo")
                .col-6
                  .text-weight-bold.text-white.normal {{ $t('pages.buy.reputation') }}
                  .text-weight-bold.text-white.normal(v-if="sellerInfo.userRep") {{ sellerInfo.userRep.rank }}
                .col-6
                  .text-weight-bold.text-white.normal {{ $t('pages.buy.timeZone') }}
                  .text-weight-bold.text-white.normal {{ sellOffer.time_zone }}
                .col-6
                  .text-weight-bold.text-white.normal {{ $t('pages.buy.status') }}
                  .text-weight-bold.text-white.normal {{ sellerInfo.userData.status }}
                //- .col-6
                //-   .text-weight-bold.text-white.normal {{ $t('pages.buy.pricePerSEED') }}
                //-   .text-weight-bold.text-white.normal {{ percentageValue }} %
        q-checkbox.text-white(v-model="isBuyingAll" dark :label="$t('pages.buy.buyAllSeeds')" color="accent" class="text-white")
        q-input(
            :label="$t('pages.buy.amountOfCrypto')"
            v-model="params.amount"
            outlined
            dark
            standout="text-accent"
            :rules="[rules.required, rules.minZero, customMaxValidation]"
            type="number"
            step="0.0001"
            autofocus
        )
          template(v-slot:append)
            .text SEEDS
        //- .hint {{$t('pages.sell.exchangeRate')}}
        //- .hint {{$t('pages.sell.marketCost', { amount: `${pricePerSeedOnUSD} USD` })}}
        .row.bg-primary.btnSave.q-py-sm
          q-btn.full-width(
              :label="$t('pages.sell.toBuy')"
              color="accent"
              type="submit"
          )
    #modals
      q-dialog(v-model="showConfirmBuy" transition-show="slide-up" transition-hide="slide-down" persistent)
        confirm-buy.custom-size-modal(:seeds="params.amount" :percentage="percentageValue" :exchange="exchangeRate" @confirm="onConfirmBuy")
    //- .text-weight-bold.text-white {{ sellerInfo }}
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { validation } from '~/mixins/validation'
import ConfirmBuy from './components/confirm-buy'
import { OfferStatus } from '../../const/OfferStatus'

export default {
  name: 'buy-offer-screen',
  mixins: [validation],
  components: { ConfirmBuy },
  mounted () {
    this.getOfferData()
    this.getCurrentSeedsPerUsd()
  },
  data () {
    return {
      OfferStatus,
      showConfirmBuy: undefined,
      sellOffer: undefined,
      sellerInfo: undefined,
      isBuyingAll: false,
      params: {
        amount: 0
      },
      customMaxValidation: val => (val <= this.parseSeedSymbolToAmount(this.availableSeeds)) || this.$t('forms.errors.maxSeedsAvailable', { amount: this.availableSeeds })
    }
  },
  computed: {
    ...mapGetters('accounts', ['account', 'currentFiatCurrency', 'pricePerSeedOnUSD']),
    offerId () {
      return this.$route.params.id
    },
    availableSeeds () {
      if (!this.sellOffer || !this.sellOffer.quantity_info) return
      return this.sellOffer.quantity_info.find(v => v.key === 'available').value
    },
    percentageValue () {
      if (!this.sellOffer) return
      return this.sellOffer.price_info.find(v => v.key === 'priceper').value
    },
    fiatToPay () {
      return this.params.amount ? (this.parseSeedsToCurrentFiat(this.params.amount) * (this.percentageValue / 100)).toFixed(2) : 0
    },
    exchangeRate () {
      return (this.myFiatExchangeRate * (this.percentageValue / 100)).toFixed(2)
    }
  },
  watch: {
    isBuyingAll (v) {
      if (v) {
        this.params.amount = this.parseSeedSymbolToAmount(this.availableSeeds).toFixed(4)
      } else {
        this.params.amount = 0.0000
      }
    }
  },
  methods: {
    ...mapActions('buyOffers', ['getOffer', 'createBuyOffer', 'getMyBuyOffers']),
    ...mapActions('accounts', ['getCurrentSeedsPerUsd', 'getBalances']),
    async onConfirmBuy () {
      this.showConfirmBuy = false
      try {
        await this.createBuyOffer({
          sellOfferId: this.sellOffer.id,
          quantity: this.parseToSeedSymbol(this.params.amount),
          paymentMethod: this.sellOffer.payment_methods.find(v => v.key === 'paypal').key
        })
        this.getBalances()
        this.showSuccessMsg(this.$root.$t('pages.buy.successMessage', { amount: this.parseToSeedSymbol(this.params.amount) }))
        // this.$router.replace({ name: 'sellOffers' })
        this.$router.replace({ name: 'dashboard', params: { tab: 'transactions', subTab: 'buy' } })
      } catch (e) {

      }
    },
    onValidForm () {
      this.showConfirmBuy = true
    },
    async getOfferData () {
      try {
        this.showIsLoading(true)
        this.sellOffer = await this.getOffer(this.offerId)
        this.showIsLoading(true)
        await this.getSellerInfo()
        this.checkIsValidOffer()
      } catch (e) {

      } finally {
        this.showIsLoading(false)
      }
    },
    async getSellerInfo () {
      try {
        this.sellerInfo = await this.$store.$userApi.getUserSeedsData({ accountName: this.sellOffer.seller })
      } catch (e) {}
    },
    async checkIsValidOffer () {
      let { rows } = await this.getMyBuyOffers()
      let existingOffers = rows.filter(
        off => off.sell_id === this.sellOffer.id &&
        off.buyer === this.account &&
        off.current_status !== OfferStatus.BUY_OFFER_SUCCESS &&
        off.current_status !== OfferStatus.BUY_OFFER_REJECTED
      )
      if (existingOffers.length > 0) {
        this.$router.replace('/offers')
        this.showSuccessMsg(this.$t('pages.buy.existing_offer'))
      }

      if (this.sellOffer.current_status !== 's.active' || this.sellOffer.type !== 'offer.sell' || this.sellOffer.seller === this.account) {
        this.$router.replace('/offers')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.iconSeeds
  background-image: url('./../sell/icons/seedsIcon.svg')
  background-repeat: no-repeat
  background-size: cover
  display: inline-block
  width: 30px
  height: 30px
  padding-left: 10px !important
  padding-right: 10px !important
.textLabelCurrent
  color: white
  font-size: 10px
.textValueCurrent
  color: white
  font-size: 16px
  font-weight: bolder
.container-current
  border-radius: 10px
// .q-pextra
//   padding: 36px
</style>
