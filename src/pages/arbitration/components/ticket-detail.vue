<template lang="pug">
 #container
    q-icon.cursor-pointer(name="keyboard_backspace" color="white" size="md" @click="$router.replace({ name: 'arbitration' })")
    .row
      .text-h5.text-white.q-mt-md Ticket 1
    .row.justify-center.q-mb-xl
      q-avatar(size="7rem").purple-ticket
        img(src="~/assets/arrows.svg")
    .row.q-mb-xl
      .col-12.q-mb-md
        .text-white.q-mb-sm {{ $t('pages.arbitration.buyer', {buyer: 'Daniel Poot'}) }}
        contact(phone="999-999-99")
      .col-12
        .text-white.q-mb-sm {{ $t('pages.arbitration.seller', {seller: 'Daniel Poot'}) }}
        contact(phone="999-999-99")
    .row.flex.self-end
      .col.q-mt-xl
        q-btn.full-width.q-mb-lg(
          :label="$t('pages.arbitration.view_details')"
          color="accent"
          size="md"
          no-caps
        )
        q-btn.full-width(
          :label="$t('pages.arbitration.view_details')"
          color="accent"
          size="md"
          no-caps
        )
</template>

<script>
import Contact from '../components/contact.vue'

export default {
  name: 'ticket-detail',
  components: { Contact }
}
</script>

<style lang="sass" scope>
</style>
