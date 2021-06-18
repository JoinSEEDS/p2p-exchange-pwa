<template lang="pug">
  #container.text-white.tab-container
    q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: 'dashboard' })")
    .row
      .subtitle.text-white.q-mt-md {{ $t('pages.buy_offer.buy_offer') }}
    .row.q-my-xs
      img.avatar-icon.self-center(src="~/assets/seedIcon.png")
      .col.q-px-md.q-py-md
          .text-white #[strong Roman Butt] {{ $t('pages.buy_offer.buy_token', {token: 'seed'}) }}
    .row
      .col
        .text-white.text-caption #[strong {{ $t('pages.buy_offer.reputation') + ':' }}]
        buy-offer-reputation
      .col
        .text-white.text-caption #[strong {{ $t('pages.buy_offer.total_transaction') + ':' }}]
        .text-white.text-caption 1,239.00
    .row.q-mb-md
      .col
        .text-white.text-caption #[strong {{ $t('pages.buy_offer.user') + ':' }}]
        .text-white.text-caption Resident
      .col
        .text-white.text-caption #[strong {{ $t('pages.buy_offer.time_zone') + ':' }}]
        .text-white.text-caption GMT - 5
    .row
      .col-12.text-h4.text-center 16.00
      .col-12.text-h6.text-center Seeds
    hr.custom-separator
    .row.q-mb-sm
      .col-12.text-h4.text-center $13.50
      .col-12.text-h6.text-center USD
    q-btn(label="Accept offer" color="accent").full-width.q-my-sm.custon-btn
    q-btn(label="Reject offer" color="negative").full-width.q-my-sm.custon-btn
    q-btn(label="Report arbtration" color="warning").full-width.q-my-sm.custon-btn
</template>

<script>
import BuyOfferReputation from './read/buy-offer-reputation'
export default {
  name: 'buy-offer',
  components: { BuyOfferReputation }
}
</script>

<style lang="sass">
  .tab-container
    padding: 30px 30px !important
  .custom-separator
    border-color: $warning
    width: 50%
    margin: 20px auto
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
    border-radius: 5px
  .btn-img-container
    height: 100% !important
    border-top-left-radius: 5px
    border-bottom-left-radius: 5px
</style>
