<template lang="pug">
    .row.justify-center
        .col-6
            q-dialog.esrModal(ref="esrModal" @before-hide="onHide" persistent)
                q-card.q-pa-md.full-width.esrModal(v-if="esrRequest")
                  #listening(v-if="listeningTransaction")
                    .text-h5.text-center Sign Request
                    .row.justify-center
                        .col-6
                            q-img(
                                :src="esrRequest.qr"
                            )
                    .text-h5.text-center {{ leftTime }} sec
                    .text-center Listening for approved transaction
                    .text-body2.text-primary.text-weight-bold.text-center.cursor-pointer.q-mt-sm(@click="signTransaction") Launch Wallet
                    //- q-btn.full-width(
                    //-     label="Launch wallet"
                    //-     color="primary"
                    //-     @click="signTransaction"
                    //- )
                  #expired(v-else)
                    .text-h6.text-negative.text-center.q-my-md Transaction expired
                    q-btn.full-width(
                      label="Close"
                      color="negative"
                      @click="$refs.esrModal.hide()"
                    )
</template>

<script>
import { mapMutations } from 'vuex'
const {
  HYPERION_TIME_OUT
} = process.env

export default {
  name: 'esr-modal',
  props: {
    value: {
    },
    esrRequest: {}
  },
  data () {
    return {
      leftTime: 1000,
      interval: undefined,
      LightWallet: window
    }
  },
  mounted () {
    this.showIsLoading(false)
    window.lightWalletResponseCallback = this.lightWalletResponseCallback
  },
  methods: {
    ...mapMutations('general', ['setESRRequest']),
    lightWalletResponseCallback (response) {
      console.log('exceuting lightWalletResponseCallback from VUE')
      this.showSuccessMsg(response)
      return 'this is a response'
    },
    listenTransaction () {
      this.leftTime = HYPERION_TIME_OUT + 8
      this.interval = setInterval(() => {
        if (this.leftTime > 0) {
          this.leftTime = this.leftTime - 1
        }
      }, 1000)
    },
    onHide () {
      clearInterval(this.interval)
      this.setESRRequest(null)
    },
    async signTransaction () {
      try {
        // const r = await this.$store.$esrApi.signEsrTransaction({
        //   esr: this.esrRequest.esr,
        //   contractName: this.esrRequest.actions[0].account,
        //   actionName: this.esrRequest.actions[0].name,
        //   memo: this.esrRequest.actions[0].data.memo
        // })
        console.log('requesting sing transaction', this.esrRequest, this.LightWallet)
        // this.LightWallet.postMessage(this.esrRequest.esr)
        window.lw.postMessage(this.esrRequest.esr)
        window.lightWallet.postMessage(this.esrRequest)
        alert('request sent v2')
        // window.open(this.esrRequest.esr, '_blank')
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
        this.listenTransaction()
      } else {
        this.$refs.esrModal.hide()
        this.onHide()
        this.$emit('cancel')
      }
    },
    leftTime (v) {
      if (v === 0) {
        clearInterval(this.interval)
      }
    }
  },
  computed: {
    showModal () {
      return !!this.esrRequest
    },
    listeningTransaction () {
      return !(this.leftTime === 0)
    }
  }

}
</script>

<style lang="sass" scoped>
.esrModal
  z-index: 9999 !important
</style>
