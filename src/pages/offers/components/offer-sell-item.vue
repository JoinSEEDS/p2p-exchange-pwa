<template lang="pug">
#subContainer
  .row.q-mb-sm
    img.avatar-icon.self-center(src="../icons/seedIcon.png")
    .col.q-px-md.q-py-md
        .text-white {{ offer.seller }}
        .text-white {{ quantity }}
        .text-weight-bold.text-info {{ price }}
  .row
    .col
        q-btn.full-width(
            :label="$t('common.buttons.make_payment')"
            color="light-blue-9"
        )
        q-separator.full-width.q-my-sm(color="warning")
</template>

<script>
import { OfferStatus } from '~/const/OfferStatus'
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
        return v.key === 'available'
      })
      return buyQuantity ? buyQuantity.value : 'UNKNOWN'
    },
    price () {
      const { key, value } = this.offer.price_info[0]
      return `${value} ${key}`
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
