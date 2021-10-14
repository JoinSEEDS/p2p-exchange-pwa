<template lang="pug">
    .row.justify-center
        .col-6
            q-dialog(ref="esrModal" @before-hide="onHide")
                q-card.q-pa-md.full-width(v-if="esrRequest")
                    .text-h5.text-center Sign Request
                    //- p {{ esrRequest }}
                    .row.justify-center
                        .col-6
                            q-img(
                                :src="esrRequest.qr"
                            )
                    q-btn.full-width(
                        label="Launch wallet"
                        color="primary"
                        @click="signTransaction"
                    )
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'esr-modal',
  props: {
    value: {
    },
    esrRequest: {}
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations('general', ['setESRRequest']),
    onHide () {
      this.setESRRequest(null)
    },
    async signTransaction () {
      try {
        const r = await this.$store.$esrApi.signEsrTransaction({
          esr: this.esrRequest.esr,
          contractName: this.esrRequest.actions[0].account,
          actionName: this.esrRequest.actions[0].name,
          memo: this.esrRequest.actions[0].data.memo
        })
        console.log('signTransactionSuccess', r)
      } catch (e) {
        console.error(e)
      }
    }
  },
  watch: {
    showModal (v) {
      console.log('showModal', v)
      if (v) {
        this.$refs.esrModal.show()
      } else {
        this.$refs.esrModal.hide()
        this.onHide()
        this.$emit('cancel')
      }
    }
  },
  computed: {
    showModal () {
      return !!this.esrRequest
    }
  }

}
</script>

<style lang="sass" scoped>

</style>
