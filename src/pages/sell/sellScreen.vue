<template lang="pug">
#container
  q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: 'dashboard' })")
  q-form.q-gutter-md.q-mt-sm(@submit.prevent="onSubmitForm")
    .subtitle.text-white.q-mt-md {{ $t('pages.sell.toSell') }}
    .text-white {{ $t('pages.sell.defineTheSaleOffer') }}
    .row.justify-center
        .col-5
            .text-h4.text-white.text-center {{ availableSeeds }}
            q-separator(color="warning")
            .text-h6.text-white.text-center.text-uppercase {{ $t('pages.sell.seeds') }}
    q-input(
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
    q-input(
        :label="$t('pages.sell.preferredCurrency')"
        v-model="params.fiatCurrency"
        outlined
        dark
        disable
        standout="text-accent"
        :rules="[rules.required]"
        bg-color="warning"
    )
    q-input(
        :label="$t('pages.sell.costPerCrypto')"
        v-model="params.costPerCrypt"
        outlined
        dark
        standout="text-accent"
        :rules="[rules.required, rules.minZero]"
        :hint="$t('pages.sell.marketCost', { amount: `${pricePerSeedOnUSD} USD` })"
        type="number"
    )
      template(v-slot:append)
        .text %
    .row.bg-primary.btnSave.q-py-sm
        q-btn.full-width(
            :label="$t('pages.sell.toSell')"
            color="accent"
            type="submit"
        )
  #modals
    q-dialog(v-model="showConfirmSell" transition-show="slide-up" transition-hide="slide-down" persistent)
      confirm-sell.custom-size-modal(:seeds="params.amount" :percentage="params.costPerCrypt" @confirm="onConfirmSell")
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
      params: {
        amount: undefined,
        costPerCrypt: 100
      },
      customMaxValidation: val => val <= this.availableSeeds || this.$t('forms.errors.maxSeedsAvailable', { amount: this.availableSeeds })
    }
  },
  mounted () {
    try {
      this.availableSeeds = Number.parseFloat(this.userBalances.available_balance.replace(' SEEDS', ''))
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
    }
  },
  methods: {
    ...mapActions('accounts', ['getCurrentSeedsPerUsd', 'getBalances']),
    ...mapActions('sellOffers', ['addSellOffer']),
    async onConfirmSell () {
      try {
        const response = await this.addSellOffer({
          totalOffered: this.parseToSeedSymbol(this.params.amount),
          pricePercentage: this.params.costPerCrypt
        })
        console.log('response', response)
        this.getBalances()
        this.showSuccessMsg(this.$t('pages.sell.successMessage', { amount: this.parseToSeedSymbol(this.params.amount) }))
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
</style>
