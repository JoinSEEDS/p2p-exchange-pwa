export default () => ({
  account: null,
  seedsAccount: undefined,
  p2pAccount: undefined,
  balances: undefined,
  currentSeedsPerUsd: 0,
  autoLogin: false,
  loading: {}, // Wallets loading status
  requestAccount: false,
  availableAccounts: {
    list: {
      data: [],
      loaded: true
    }
  }
})
