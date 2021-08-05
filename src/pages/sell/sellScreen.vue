<template lang="pug">
#container
  q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: 'dashboard' })")
  q-form().q-gutter-md.q-mt-sm(@submit.prevent="onSubmitForm")
    .subtitle.text-white.q-mt-md {{ $t('pages.sell.toSell') }}
    .text-white {{ $t('pages.sell.defineTheSaleOffer') }}
    .row.justify-center
        .col-8
            .text-h4.text-white.text-center {{ parseToSeedsAmount(params.amount) }}
              span.text-h6.text-white.text-center.text-uppercase.q-ml-sm {{ $t('pages.sell.seeds') }}
            q-separator(color="warning")
            .text-h4.text-white.text-center {{ fiatToGet.toFixed(2) }}
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
        type="number"
        step="0.0001"
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
    q-input(
        :label="$t('pages.sell.costPerCrypto')"
        v-model="params.costPerCrypt"
        outlined
        dark
        standout="text-accent"
        :rules="[rules.required, rules.minZero]"
        type="number"
    )
      template(v-slot:append)
        .text %
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
      confirm-sell.custom-size-modal(:seeds="params.amount" :percentage="params.costPerCrypt" :exchange="exchangeRate" @confirm="onConfirmSell")
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
        amount: Number.parseFloat(0).toFixed(4),
        costPerCrypt: 100
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
      this.availableSeeds = 0.0000
      if (this.userBalances) {
        this.availableSeeds = Number.parseFloat(this.userBalances.available_balance.replace(' SEEDS', '')).toFixed(4)
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
      return Number.parseFloat(this.availableSeeds - currentAmount).toFixed(4)
    },
    fiatToGet () {
      return this.parseSeedsToCurrentFiat(this.params.amount) * ((this.params.costPerCrypt / 100))
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
          pricePercentage: this.params.costPerCrypt
        })
        this.getBalances()
        this.showSuccessMsg(this.$root.$t('pages.sell.successMessage', { amount: this.parseToSeedSymbol(this.params.amount) }))
        this.$router.replace({ name: 'dashboard' })
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
#container
  padding: 10px
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
</style>
