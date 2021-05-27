<template lang="pug">
  #container.text-white.tab-container
    q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: 'dashboard' })")
    .row
      .subtitle.text-white.q-mt-md {{ $t('pages.make_payment.make_payment') }}
    .row.q-my-md
      img.avatar-icon.self-center(src="~/assets/seedIcon.png")
      .col.q-px-md.q-py-md
          .text-white #[strong Roman Butt] has accepted your purchase offer.
    .row
      .col-12.text-h4.text-center 16.00
      .col-12.text-h6.text-center Seeds
    hr.custom-separator
    .row
      .col-12.text-h4.text-center $13.50
      .col-12.text-h6.text-center USD
    .row.q-my-xl
      .text-white To complete the purchase, make the payment through PayPal to the following account.
      .text-accent.more-info.cursor-pointer More information
    q-btn(color="blue").full-width.q-my-sm.custon-btn
      template(v-slot:default).flex-justify-between
        .col-2.bg-white.flex.align-center.justify-center.btn-img-container
          q-img(src="~/assets/paypal.png").self-center.btn-img
        label.col-9 https://paypal.me/romanbutt
        q-icon(name="content_copy").col-1
    q-btn(label="Send payment ticket" color="positive").full-width.q-my-sm.custon-btn
    q-btn(label="Report arbtration" color="warning").full-width.q-my-sm.custon-btn
</template>

<script>
export default {
  name: 'make-payment'
}
</script>

<style lang="sass">
  .tab-container
    padding: 30px 30px !important
  .custom-separator
    color: $warning
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
    height: 40px
    border-radius: 5px
  .btn-img-container
    height: 100% !important
    border-top-left-radius: 5px
    border-bottom-left-radius: 5px
</style>
