export default () => ({
  account: null,
  seedsAccount: undefined,
  p2pAccount: undefined,
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
