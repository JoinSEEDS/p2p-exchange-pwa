<template lang="pug">
.flex.column
  q-pull-to-refresh(@refresh="refresh")
    #tickets-empty(v-if="ticketsRowsAreEmpty && loading")
      skeleton-tickets
    #no-data(v-if="ticketsRowsAreEmpty && !loading")
      .text-h5.custom-font No tickets assigned
    q-infinite-scroll.infiniteScroll(@load="onLoad" :offset="scrollOffset" :scroll-target="$refs.scrollTarget" ref="customInfinite")
      #containerScroll(ref="scrollTarget")
        #items(v-for="ticket in tickets.rows")
          ticket(:ticket="ticket")
</template>

<script>
import { mapActions } from 'vuex'
import SkeletonTickets from '~/components/skeleton/skeletonTicket'
import Ticket from '../components/ticket'

export default {
  name: 'assigned-tickets',
  components: { Ticket, SkeletonTickets },
  data () {
    return {
      scrollOffset: 1000,
      loading: true,
      limit: 4,
      tickets: {
        more: true,
        rows: [],
        nextKey: undefined
      }
    }
  },
  methods: {
    ...mapActions('arbitration', ['getAssignetTicketByArbiter']),
    refresh (done) {
      this.resetPagination()
      done()
    },
    async onLoad (index, done) {
      this.loading = true
      if (this.tickets.more) {
        const { rows, more, next_key: nextKey } = await this.getAssignetTicketByArbiter({
          limit: this.limit,
          nextKey: this.tickets.nextKey
        })
        console.log(rows, 'Assigned Tickets')
        this.tickets.rows = this.tickets.rows.concat(rows)
        this.tickets.more = more
        this.tickets.nextKey = nextKey
        done()
      }
      this.loading = false
    },
    async resetPagination () {
      this.tickets = {
        more: true,
        rows: [],
        nextKey: undefined
      }
      await this.$nextTick()
      this.$refs.customInfinite.stop()
      await this.$nextTick()
      this.$refs.customInfinite.resume()
      await this.$nextTick()
      this.$refs.customInfinite.trigger()
    }
  },
  computed: {
    ticketsRowsAreEmpty () {
      return this.tickets.rows.length === 0
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
