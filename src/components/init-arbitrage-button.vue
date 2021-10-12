<template lang="pug">
q-btn.q-my-sm(
  :label="$t('common.buttons.init_arbitrage')"
  color="negative"
  @click="initArbitrage"
  no-caps
  dense
).custom-round
</template>

<script>
import { mapActions } from 'vuex'
import { EventBus } from '~/event-bus.js'

export default {
  name: 'init-arbitrage-button',
  props: {
    buyOfferId: {
      type: Number,
      require: true,
      default: undefined
    }
  },
  methods: {
    ...mapActions('arbitration', ['initArbiter']),
    async initArbitrage () {
      try {
        // const response = await this.initArbiter({ offerId: this.buyOfferId })
        // this.showTransactionId(response.transactionId)
        const res = await this.initArbiter({ offerId: this.buyOfferId })
        if (res) {
          this.showSuccessMsg(this.$root.$t('pages.arbitration.arbitrage_inited'))
          EventBus.$emit('confirmOffer')
        }
      } catch (e) {
      }
    }
  }
}
</script>
<style lang="sass" scoped>

</style>
