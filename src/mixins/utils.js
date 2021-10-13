import { mapMutations, mapGetters, mapActions } from 'vuex'
import GreenFlatBtn from '~/components/green-flat-btn'
import SkeletonOfferItem from '~/components/skeleton/skeletonOfferItem'
import { OfferStatus } from '../const/OfferStatus'

export const utils = {
  components: { GreenFlatBtn, SkeletonOfferItem },
  computed: {
    ...mapGetters('accounts', ['pricePerSeedOnEUR', 'currentFiatCurrency', 'fiatExchanges']),
    ...mapGetters('settings', ['acceptLim', 'sellerConfirmLim', 'buyerConfirmLim']),
    myFiatExchangeRate () {
      return Number.parseFloat(this.fiatExchanges.rates[this.currentFiatCurrency.toUpperCase()] * this.pricePerSeedOnEUR).toFixed(4)
    }
  },
  methods: {
    ...mapMutations('general', ['setErrorMsg', 'setSuccessMsg', 'setIsLoading', 'setESRRequest']),
    ...mapActions('settings', ['getSettings']),
    async createEsrRequest (actions) {
      this.setESRRequest(null)
      this.showIsLoading(true)
      // const esr = await this.$store.$esrApi.buildTransactionLink(actions)
      const esr = await this.$store.$esrApi.generateESR(actions)
      this.showIsLoading(false)
      const esrRequest = {
        ...esr
      }
      console.log('createEsrRequest', esrRequest)
      this.setESRRequest(esrRequest)
    },
    copyToClipboard (str) {
      const el = document.createElement('textarea')
      el.value = str
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      if (selected) {
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(selected)
      }
    },
    showNotification (message, type = 'success') {
      const color = type.toLowerCase() === 'success' ? 'green' : 'red'
      const icon = type.toLowerCase() === 'success' ? 'done' : 'error'
      this.$q.notify({
        color: color,
        textColor: 'white',
        message: message,
        icon: icon,
        timeout: 5000,
        actions: [{ label: 'Close', color: 'white' }]
      })
    },
    showSuccessMsg (message) {
      this.setSuccessMsg(message)
    },
    showErrorMsg (message) {
      this.setErrorMsg(message)
    },
    showIsLoading (state) {
      this.setIsLoading(state)
    },
    parseToSeedsAmount (amount) {
      return amount ? Number.parseFloat(amount).toFixed(2) : 0
    },
    parseToSeedSymbol (amount) {
      if (!amount) return '0 SEEDS'
      return `${Number.parseFloat(amount).toFixed(4)} SEEDS`
    },
    parseSeedSymbolToAmount (seedsAmount) {
      if (!seedsAmount) return 0
      return Number.parseFloat(seedsAmount.replace(' SEEDS', ''))
    },
    parseSeedsToCurrentFiatWithSymbol (seedsAmount) {
      const myExchangeRate = Number.parseFloat(this.fiatExchanges.rates[this.currentFiatCurrency.toUpperCase()])
      const priceOfSeedsOnEUR = Number.parseFloat(seedsAmount) * this.pricePerSeedOnEUR
      const priceOfSeedsOnMyFiatCurrency = Number.parseFloat(priceOfSeedsOnEUR * myExchangeRate)
      return `${priceOfSeedsOnMyFiatCurrency.toFixed(2)} ${this.currentFiatCurrency.toUpperCase()}`
    },
    parseSeedsToCurrentFiat (seedsAmount) {
      const myExchangeRate = Number.parseFloat(this.fiatExchanges.rates[this.currentFiatCurrency.toUpperCase()])
      const priceOfSeedsOnEUR = Number.parseFloat(seedsAmount) * this.pricePerSeedOnEUR
      const priceOfSeedsOnMyFiatCurrency = Number.parseFloat(priceOfSeedsOnEUR * myExchangeRate)
      return priceOfSeedsOnMyFiatCurrency.toFixed(2)
    },
    parseSeedsToFiat (seedsAmount, fiatCode) {
      const myExchangeRate = Number.parseFloat(this.fiatExchanges.rates[fiatCode.toUpperCase()])
      const priceOfSeedsOnEUR = Number.parseFloat(seedsAmount) * this.pricePerSeedOnEUR
      const priceOfSeedsOnMyFiatCurrency = Number.parseFloat(priceOfSeedsOnEUR * myExchangeRate)
      return priceOfSeedsOnMyFiatCurrency.toFixed(2)
    },
    parseStatus (status) {
      let keyStatus = Object.keys(OfferStatus).find(key => OfferStatus[key] === status)
      let statusPieces = keyStatus.split('_')
      let statusName = statusPieces[statusPieces.length - 1].toLowerCase()
      return statusName
    },
    async remainingTimeToAcceptOffer (creationDate) {
      await this.getSettings()

      let sinceDate = Date.parse(creationDate)
      let limitMs = this.acceptLim * 1000
      let limitMins = this.acceptLim / 60
      let nowLocal = new Date()
      var now = new Date(
        nowLocal.getUTCFullYear(),
        nowLocal.getUTCMonth(),
        nowLocal.getUTCDate(),
        nowLocal.getUTCHours(),
        nowLocal.getUTCMinutes(),
        nowLocal.getUTCSeconds(),
        nowLocal.getUTCMilliseconds()
      )
      let limitDate = sinceDate + limitMs
      let remainingTime = limitDate - now
      let remainingMinutes = remainingTime / 60000

      let percentage = ((100 / limitMins) * remainingMinutes)
      return (remainingMinutes < 0) ? 0 : { remainingMinutes, percentage }

      // let { hours, minutes } = this.getHoursAndMinutes(remainingMinutes)
      // return `${hours} h ${minutes} m`
    },
    async sellerCanInitArbitrage (acceptanceDate) {
      await this.getSettings()

      let sinceDate = Date.parse(acceptanceDate)
      let limitMs = this.buyerConfirmLim * 1000
      let nowLocal = new Date()
      var now = new Date(
        nowLocal.getUTCFullYear(),
        nowLocal.getUTCMonth(),
        nowLocal.getUTCDate(),
        nowLocal.getUTCHours(),
        nowLocal.getUTCMinutes(),
        nowLocal.getUTCSeconds(),
        nowLocal.getUTCMilliseconds()
      )
      let limitDate = sinceDate + limitMs
      let remainingTime = limitDate - now
      let remainingMinutes = remainingTime / 60000

      return remainingMinutes <= 0
    },
    async buyerCanInitArbitrage (payDate) {
      await this.getSettings()

      let sinceDate = Date.parse(payDate)
      let limitMs = this.sellerConfirmLim * 1000
      let nowLocal = new Date()
      var now = new Date(
        nowLocal.getUTCFullYear(),
        nowLocal.getUTCMonth(),
        nowLocal.getUTCDate(),
        nowLocal.getUTCHours(),
        nowLocal.getUTCMinutes(),
        nowLocal.getUTCSeconds(),
        nowLocal.getUTCMilliseconds()
      )
      let limitDate = sinceDate + limitMs
      let remainingTime = limitDate - now
      let remainingMinutes = remainingTime / 60000

      return remainingMinutes <= 0
    }
  }
}
