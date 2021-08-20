<template lang="pug">
.flex.column
  q-pull-to-refresh(@refresh="refresh")
    #tickets-empty(v-if="false")
      skeleton-tickets
    #no-data(v-if="false")
      .text-h5.custom-font Any Ticket Assigned
      .text-h4.custom-font Follow Up One
    q-infinite-scroll.infiniteScroll
      #containerScroll(ref="scrollTarget")
        ticket
        ticket
        ticket
        ticket
</template>

<script>
import SkeletonTickets from '~/components/skeleton/skeletonTicket'
import Ticket from '../components/ticket'

export default {
  name: 'assigned-tickets',
  components: { Ticket, SkeletonTickets },
  methods: {
    refresh (done) {
      console.log('Refresh')
      done()
    }
  }
}
</script>

<style lang="sass">
#containerScroll
  overflow: auto
  flex: 1
  max-height: 600px
#ticket-empty
  flex: 1
#no-data
  height: 60vh !important
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
.custom-font
  font-family: 'SF Pro Display'
</style>
