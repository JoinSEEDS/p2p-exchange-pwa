<template lang="pug">
  #cont
    q-card.q-pa-md.bg-light
      .row.justify-between
        .subtitle.text-dark {{ $t('pages.buy.cancel') }}
        green-flat-btn(:label="$t('pages.general.close')" v-close-popup)
      .row.q-my-sm
        .col-12
          .text-dark {{ $t('pages.buy.confirm_cancel') }}
      .row.q-my-sm.q-gutter-md
        .col
          q-btn(color="red" :label="$t('common.buttons.dismiss')" v-close-popup).full-width
        .col
          q-btn(color="green" :label="$t('common.buttons.confirm')" @click="cancelOffer()").full-width
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
