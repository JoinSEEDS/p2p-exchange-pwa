<template lang="pug">
#subContainer
  .row
    img.avatar-icon.self-center(src="../icons/seedIcon.png")
    .col.q-px-md.q-py-md
        .text-white {{ offer.seller }}
        .text-white {{ quantity }}
        .text-weight-bold.text-info {{ offer.memo }}
  .row
    .col
        q-btn.full-width(
            v-if="offer.current_status === OfferStatus.BUY_OFFER_PENDING"
            :label="$t('common.buttons.waiting')"
            color="orange-6"
        )
        q-separator.full-width.q-my-sm(color="warning")
</template>

<script>
import { OfferStatus } from '~/const/offerStatus'
export default {
  name: 'offer-sell-item',
  props: {
    offer: {
      type: Object,
      default: () => undefined
    }
  },
  data () {
    return {
      OfferStatus
    }
  },
  computed: {
    quantity () {
      const buyQuantity = this.offer.quantity_info.find(v => {
        return v.key === 'buyquantity'
      })
      return buyQuantity.value || 'UNKNOWN'
    }
  },
  methods: {
    takeOffer () {
      // this.$router.push({ name: 'buy', params: { id: this.offer.id } })
    }
  }
}
</script>

<style lang="sass" scoped>
.avatar-icon
  width: 60px
  height: 60px
</style>
