export const setLoadingWallet = (state, wallet) => {
  state.loading = wallet
}

export const setRequestAccount = (state, requestAccount) => {
  state.requestAccount = requestAccount
}

export const setAccount = (state, account) => {
  state.account = account
}

export const setAutoLogin = (state, status) => {
  state.autoLogin = status
}

export const setSignUpForm = (state, form) => {
  state.signUpForm = form
}

export const resetAvailableAccounts = (state) => {
  state.availableAccounts.list.data = []
  state.availableAccounts.list.loaded = false
}

export const setAvailableAccounts = (state, accounts) => {
  state.availableAccounts.list.data = accounts
  state.availableAccounts.list.loaded = true
}

export const setSeedsAccount = (state, seedsAccount) => {
  state.seedsAccount = seedsAccount
}

export const setP2PAccount = (state, p2pAccount) => {
  state.p2pAccount = p2pAccount
}

export const setP2PBalances = (state, balances) => {
  state.balances = balances
}

export const setCurrentSeedsPerUsd = (state, currentSeedsPerUsd) => {
  state.currentSeedsPerUsd = currentSeedsPerUsd
}

export const setFiatExchanges = (state, fiatExchanges) => {
  state.fiatExchanges = fiatExchanges
}
