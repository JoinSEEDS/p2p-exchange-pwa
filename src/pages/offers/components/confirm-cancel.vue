<template lang="pug">
  #cont
    q-card.q-pa-md.bg-light
      .row.justify-between
        .subtitle.text-dark Cancel buy offer
        green-flat-btn(:label="$t('pages.general.close')" v-close-popup)
      .row.q-my-sm
        .col-12
          .text-dark Are you sure of cancel this offer?
      .row.q-my-sm.q-gutter-md
        .col
          q-btn(color="red" label="Dismiss" v-close-popup).full-width
        .col
          q-btn(color="green" label="Accept" @click="cancelOffer()").full-width
</template>

<script>
import { mapActions } from 'vuex'
import { EventBus } from '~/event-bus.js'

export default {
  name: 'confirm-cancel',
  props: {
    id: Number
  },
  methods: {
    ...mapActions('buyOffers', ['cancelBuyOffer']),
    async cancelOffer () {
      await this.cancelBuyOffer({ buyOfferId: this.id })
      EventBus.$emit('canceled')
      this.$emit('canceledBtn')
    }
  }
}
</script>

<style lang="sass">
  .bo
    border: 1px solid black
</style>
