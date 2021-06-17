export const isAuthenticated = ({ account }) => !!account
export const isP2PProfileCompleted = ({ p2pAccount }) => !!p2pAccount
export const account = ({ account }) => account
export const loading = ({ loading }) => loading
export const isAutoLoading = ({ autoLogin }) => autoLogin
export const availableAccounts = ({ availableAccounts }) => availableAccounts.list.data
export const availableAccountsLoaded = ({ availableAccounts }) => availableAccounts.list.loaded
export const requestAccount = ({ requestAccount }) => requestAccount
export const userCanSell = ({ seedsAccount }) => {
  return (seedsAccount.status === 'citizen' || seedsAccount.status === 'resident')
}
export const userBalances = ({ balances }) => {
  return balances
}
export const currentFiatCurrency = ({ p2pAccount }) => {
  return p2pAccount.fiat_currency
}
export const pricePerSeedOnUSD = ({ currentSeedsPerUsd }) => {
  return Number.parseFloat(1 / Number.parseFloat(currentSeedsPerUsd.replace(' SEEDS', '')).toFixed(4)).toFixed(4)
}
export const pricePerSeedOnEUr = ({ currentSeedsPerUsd, fiatExchanges }) => {
  const pricePerSeedOnUSD = Number.parseFloat(1 / Number.parseFloat(currentSeedsPerUsd.replace(' SEEDS', '')).toFixed(4)).toFixed(4)
  const pricePerEURonUSD = fiatExchanges.rates['USD']
  const pricePerSeedOnEUR = 1 / pricePerEURonUSD
  return (pricePerSeedOnEUR * pricePerSeedOnUSD).toFixed(4)
}
