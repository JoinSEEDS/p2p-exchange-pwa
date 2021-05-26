<template lang="pug">
#container.q-ma-sm.q-pa-sm
  .row
    img.avatar-icon.self-center(src="../icons/seedIcon.png")
    .col.q-px-md.q-pb-sm
        .text-weight-bold.text-info Available: {{ offer.quantity_info[0].value }}
        .text-white Fiat Currency: {{ offer.fiat_currency }}
        .text-white Percentage Price: {{ offer.price_info[0].value }}%
        .text-white Time Zone: {{ offer.time_zone }}
  .row
    .col
        q-btn.full-width(
            label="Offer detail"
            color="accent"
            @click="takeOffer"
            size="md"
        )
        q-separator.full-width.q-my-md(color="warning")
</template>

<script>
export default {
  name: 'offerItem',
  props: {
    offer: {
      type: Object,
      default: () => undefined
    }
  },
  methods: {
    takeOffer () {
      this.$router.push({ name: 'buy', params: { id: this.offer.id } })
    }
  }
}
</script>

<style lang="sass" scoped>
.avatar-icon
  width: 60px
  height: 60px
</style>
