<template lang="pug">
#cont
  .q-pa-md
    q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: 'dashboard' })")
    q-form().q-gutter-md.q-mt-sm(@submit.prevent="onSubmitForm")
      .subtitle.text-white.q-mt-md {{ $t('pages.sell.toSell') }}
      .text-white {{ $t('pages.sell.defineTheSaleOffer') }}
      .row.justify-center
          .col-xs-11.col-md-8
              .row
                .col-xs-9.col-md-10
                  .text-h4.text-white.text-center {{ parseToSeedsAmount(params.amount) || 0 }}
                .col
                  span.text-h6.text-white.text-center.text-uppercase.q-ml-sm {{ $t('pages.sell.seeds') }}
              q-separator(color="warning")
              .row
                .col-xs-9.col-md-10
                  .text-h4.text-white.text-center {{ fiatToGet }}
                .col
                  span.text-h6.text-white.text-center.text-uppercase.q-ml-sm {{params.fiatCurrency}}
      .row.bg-warning.container-current
        .q-pa-sm
          .iconSeeds
        .col-sm-11.self-center
          .textLabelCurrent.q-ml-xs {{ $t('pages.sell.currentTotal') }}
          .textValueCurrent.q-ml-xs {{ availableSeeds }}
      q-checkbox.text-white(v-model="isSellAll" dark :label="$t('pages.sell.sellAllSeeds')" color="accent" class="text-white")
      q-input(
          autofocus
          :label="$t('pages.sell.amountOfCrypto')"
          v-model="params.amount"
          outlined
          dark
          standout="text-accent"
          :rules="[rules.required, rules.minZero, customMaxValidation]"
          :hint="$t('pages.sell.afterTransaction', { amount: afterAmount })"
          mask="#.##"
          fill-mask="0"
          reverse-fill-mask
          input-class="text-right"
      )
        template(v-slot:append)
          .text SEEDS
      //- q-input(
      //-     :label="$t('pages.sell.preferredCurrency')"
      //-     v-model="params.fiatCurrency"
      //-     outlined
      //-     dark
      //-     disable
      //-     standout="text-accent"
      //-     :rules="[rules.required]"
      //-     bg-color="warning"
      //- )
      .text-white {{ $t('pages.sell.costPerCrypto') }}
      .row
        .col-11
        q-slider.q-my-xs(
          v-model="params.costPerCrypt"
          :min="-100"
          :max="100"
          :step="1"
          snap
          label
          :label-value="params.costPerCrypt + '%'"
          label-always
          color="white"
          label-text-color="black"
        )
      //- // q-input(
      //-     :label="$t('pages.sell.costPerCrypto')"
      //-     v-model="params.costPerCrypt"
      //-     outlined
      //-     dark
      //-     standout="text-accent"
      //-     :rules="[rules.required, rules.minZero]"
      //-     type="number"
      //- // )
      //-   template(v-slot:append)
      //-     .text %
      .hint {{$t('pages.sell.exchangeRate')}}
      .hint {{$t('pages.sell.marketCost', { amount: `${exchangeRate} ${currentFiatCurrency.toUpperCase()}` })}}
      .row.bg-primary.btnSave.q-py-sm
          q-btn.full-width(
              :label="$t('pages.sell.toSell')"
              color="accent"
              type="submit"
          )
    #modals
      q-dialog(v-model="showConfirmSell" transition-show="slide-up" transition-hide="slide-down" persistent)
        confirm-sell.custom-size-modal(:seeds="params.amount" :percentage="percentageMarketPrice" :exchange="exchangeRate" @confirm="onConfirmSell")
</template>

<script>
import { validation } from '~/mixins/validation'
import { mapGetters, mapActions } from 'vuex'
import ConfirmSell from './components/confirm-sell'

export default {
  name: 'seel-screen',
  mixins: [validation],
  components: { ConfirmSell },
  data () {
    return {
      showConfirmSell: false,
      availableSeeds: undefined,
      isSellAll: false,
      params: {
        amount: undefined,
        costPerCrypt: 0
      },
      customMaxValidation: val => (val <= this.parseSeedSymbolToAmount(this.availableSeeds)) || this.$t('forms.errors.maxSeedsAvailable', { amount: this.availableSeeds })
    }
  },
  watch: {
    isSellAll (v) {
      if (v) {
        this.params.amount = this.availableSeeds
      } else {
        this.params.amount = 0
      }
    }
  },
  mounted () {
    try {
      this.availableSeeds = 0.00
      if (this.userBalances) {
        this.availableSeeds = Number.parseFloat(this.userBalances.available_balance.replace(' SEEDS', '')).toFixed(2)
      }
      this.params.fiatCurrency = this.currentFiatCurrency.toUpperCase()
      this.getCurrentSeedsPerUsd()
    } catch (e) {

    }
  },
  computed: {
    ...mapGetters('accounts', ['userBalances', 'currentFiatCurrency', 'pricePerSeedOnUSD']),
    afterAmount () {
      const currentAmount = this.params.amount ? Number.parseFloat(this.params.amount) : 0
      return Number.parseFloat(this.availableSeeds - currentAmount).toFixed(2)
    },
    percentageMarketPrice () {
      return 100 + this.params.costPerCrypt
    },
    fiatToGet () {
      return this.params.amount ? (this.parseSeedsToCurrentFiat(this.params.amount) * ((this.percentageMarketPrice / 100))).toFixed(2) : 0
    },
    exchangeRate () {
      return this.myFiatExchangeRate
    }
  },
  methods: {
    ...mapActions('accounts', ['getCurrentSeedsPerUsd', 'getBalances']),
    ...mapActions('sellOffers', ['addSellOffer']),
    async onConfirmSell () {
      try {
        await this.addSellOffer({
          totalOffered: this.parseToSeedSymbol(this.params.amount),
          pricePercentage: this.percentageMarketPrice
        })
        this.getBalances()
        this.showSuccessMsg(this.$root.$t('pages.sell.successMessage', { amount: this.parseToSeedSymbol(this.params.amount) }))
        // this.$router.replace({ name: 'dashboard' })
        this.$router.replace({ name: 'dashboard', params: { tab: 'transactions', subTab: 'sale' } })
      } catch (e) {

      }
    },
    onSubmitForm () {
      this.showConfirmSell = true
    }
  }
}
</script>

<style lang="sass" scoped>
// #container
//   padding: 10px
.textLabelCurrent
  color: white
  font-size: 10px
.textValueCurrent
  color: white
  font-size: 16px
  font-weight: bolder
.iconSeeds
  background-image: url('./icons/seedsIcon.svg')
  background-repeat: no-repeat
  background-size: cover
  display: inline-block
  width: 30px
  height: 30px
  padding-left: 10px !important
  padding-right: 10px !important
.container-current
  border-radius: 10px
.slider-size
  max-width: 880px
</style>
