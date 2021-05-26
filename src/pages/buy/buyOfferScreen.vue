<template lang="pug">
#container
    q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace('/offers')")
    q-form.q-gutter-md.q-mt-sm
        .subtitle.text-white.q-mt-md {{ $t('pages.buy.offerDetail') }}
        .text-white {{ $t('pages.buy.howManySeedsWillYouBuy') }}
        .row.justify-center
          .col-9
            .text-h4.text-white.text-center {{ params.amount }}
              span.text-h6.text-white.text-center.text-uppercase.q-ml-sm {{ $t('pages.sell.seeds') }}
            q-separator(color="warning")
            .text-h4.text-white.text-center ---
              span.text-h6.text-white.text-center.text-uppercase.q-ml-sm currency
        .row.bg-warning.container-current(v-if="availableSeeds")
            .q-pa-sm
              .iconSeeds
            .col-sm-11.self-center
              .textLabelCurrent.q-ml-xs {{ $t('pages.sell.currentTotal') }}
              .textValueCurrent.q-ml-xs {{ availableSeeds }}
              .text-weight-bold.text-info {{ $t('pages.buy.seller') }}: {{ sellOffer.seller }}
        q-checkbox.text-white(v-model="isBuyingAll" dark :label="$t('pages.sell.sellAllSeeds')" color="accent" class="text-white")
        q-input(
            :label="$t('pages.sell.amountOfCrypto')"
            v-model="params.amount"
            outlined
            dark
            standout="text-accent"
            :rules="[rules.required, rules.minZero, customMaxValidation]"
            type="number"
            step="0.0001"
        )
          template(v-slot:append)
            .text SEEDS
    //- .text-weight-bold.text-white {{ sellOffer }}
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { validation } from '~/mixins/validation'
export default {
  name: 'buy-offer-screen',
  mixins: [validation],
  mounted () {
    this.getOfferData()
  },
  data () {
    return {
      sellOffer: 'Getting',
      isBuyingAll: false,
      params: {
        amount: 0
      },
      customMaxValidation: val => (val <= this.parseSeedSymbolToAmount(this.availableSeeds)) || this.$t('forms.errors.maxSeedsAvailable', { amount: this.availableSeeds })
    }
  },
  computed: {
    ...mapGetters('accounts', ['account']),
    offerId () {
      return this.$route.params.id
    },
    availableSeeds () {
      if (!this.sellOffer || !this.sellOffer.quantity_info) return
      return this.sellOffer.quantity_info.find(v => v.key === 'available').value
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
    ...mapActions('buyOffers', ['getOffer']),
    async getOfferData () {
      console.log('Getting data for offer ', this.offerId)
      try {
        this.sellOffer = await this.getOffer(this.offerId)
        this.checkIsValidOffer()
      } catch (e) {}
    },
    checkIsValidOffer () {
      if (this.sellOffer.current_status !== 's.active' || this.sellOffer.type !== 'offer.sell' || this.sellOffer.seller === this.account) {
        this.$router.replace('/offers')
        console.warn('Invalid sell offer, redirecting to sell offers list')
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
</style>
