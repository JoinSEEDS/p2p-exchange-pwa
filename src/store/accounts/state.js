export default () => ({
  account: null,
  paymentMethod: undefined,
  seedsAccount: undefined,
  p2pAccount: undefined,
  balances: undefined,
  currentSeedsPerUsd: 0,
  autoLogin: false,
  loading: {}, // Wallets loading status
  requestAccount: false,
  fiatExchanges: undefined,
  availableAccounts: {
    list: {
      data: [],
      loaded: true
    }
  }
})
