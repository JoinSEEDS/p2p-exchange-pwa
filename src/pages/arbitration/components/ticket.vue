<template lang="pug">
#container.q-ma-sm.q-pa-sm
  .row
    q-avatar.purple-ticket
      img(src="~/assets/arrows.svg")
    .col.q-px-md.q-pb-sm
        .text-weight-bold.text-white {{ $t('pages.arbitration.ticket') }} 10
        .text-white {{ $t('pages.arbitration.buyer', {buyer: 'Daniel Poot'}) }}
        .text-white {{ $t('pages.arbitration.seller', {seller: 'Daniel Poot'}) }}
        .text-white.text-caption 08/13/2021
  .row
    .col
        q-btn.full-width(
            :label="$t('pages.arbitration.follow_up')"
            color="accent"
            size="md"
            v-if="isAssignedTicket"
            no-caps
            @click="onFollowUp"
        )
        q-btn.full-width(
            :label="$t('pages.arbitration.view_details')"
            color="accent"
            size="md"
            no-caps
            v-else
            @click="onViewDetail"
        )
        q-separator.full-width.q-my-md(color="warning")
</template>

<script>
export default {
  name: 'ticket',
  props: {
    isAssignedTicket: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onFollowUp () {
      console.log('Follow-up')
    },
    onViewDetail () {
      console.log('View Detail')
      this.$router.push({ name: 'ticket', params: { id: 1 } })
      /* this.$router.push({ name: '/ticket', params: { id: ticket.id } }) */
    }
  }
}
</script>

<style>
.purple-ticket {
  background-color: #9B51E0;
}

</style>
