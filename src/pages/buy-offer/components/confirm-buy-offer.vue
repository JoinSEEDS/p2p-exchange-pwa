<template lang="pug">
  #container
    q-card.q-pa-md.bg-light.q-gutter-md
      .subtitle.text-warning(v-if="accept") Accept offer
      .subtitle.text-warning(v-if="!accept") Reject offer
      .text-info.q-my-none Buyer: Diana Ross
      .row
        .col-12.text-h4.text-center.text-dark ${{ quantity }}
        .col-12.text-h6.text-center.text-dark {{ currency }}
      q-separator.text-dark.custom-separator
      .row
        .col-12.text-h4.text-center.text-dark {{ equivalentFiat }}
        .col-12.text-h6.text-center.text-dark {{ currentFiatCurrency }}
      q-btn(label="Confirm" color="accent" @click="confirmOffer()").full-width.q-my-sm.custon-btn.custom-round
      q-btn(label="Cancel" color="negative" v-close-popup).full-width.q-my-sm.custon-btn.custom-round
      //- q-btn(label="Report arbtration" color="warning").full-width.q-my-sm.custon-btn
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'confirm-buy-offer',
  props: {
    offer: Object,
    accept: Boolean
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
    confirmOffer () {
      console.log(this.offer.id)
      if (this.accept) {
        this.acceptBuyOffer({ buyOfferId: this.offer.id })
      } else {
        console.log('reject')
      }
    }
  }
}
</script>

<style lang="sass">
  // .tab-container
  //   padding: 30px 30px !important
  .custom-separator
    // border-color: $warning
    width: 50%
    // margin: 20px auto
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
