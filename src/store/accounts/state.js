export default () => ({
  account: null,
  autoLogin: false,
  loading: {}, // Wallets loading status
  requestAccount: false,
  availableAccounts: {
    list: {
      data: [],
      loaded: true
    }
  },
  seedsAccount: undefined
})
