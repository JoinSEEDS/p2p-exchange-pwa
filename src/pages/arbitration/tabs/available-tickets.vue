<template lang="pug">
.flex.column
  q-pull-to-refresh(@refresh="refresh")
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
    ticket
</template>

<script>
import Ticket from '../components/ticket'

export default {
  name: 'assigned-tickets',
  components: { Ticket },
  methods: {
    refresh (done) {
      console.log('Refresh')
      done()
    }
  }
}
</script>

<style>

</style>
