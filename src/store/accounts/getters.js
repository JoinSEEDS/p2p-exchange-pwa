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
