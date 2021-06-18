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
        div.full-width.flex.justify-center.items-center.q-mb-sm
          q-icon(name="timer" class="text-red" size="xs")
          .text-caption.q-ml-sm {{$t('pages.offers.timeTo', {time: '10:10'})}}
        q-btn.full-width(
            :label="$t('common.buttons.view_details')"
            color="accent"
            class="text-cap"
            @click="$router.replace({ name: 'buy-offer' })"
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
.text-cap
  text-transform: capitalize
</style>
