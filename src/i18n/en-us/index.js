export default {
  common: {
    appName: 'Telos Communities',
    buttons: {
      cancel: 'Cancel',
      continue: 'Continue',
      create: 'Create',
      logout: 'Logout',
      mint: 'Mint',
      register: 'Register',
      save: 'Save',
      confirm: 'Confirm'
    },
    defaultTitle: 'Title'
  },
  forms: {
    errors: {
      accountFormat: 'The account can contain lowercase characters only, numbers from 1 to 5 or a dot (.)',
      accountFormatBasic: 'The account must contain 12 lowercase characters only and number from 1 to 5',
      accountLength: 'The account must contain at most 12 characters',
      accountNotAvailable: 'The account "{account}" already exists',
      accountNotExists: 'The account "{account}" does not exist',
      copyKey: 'Copy the key to a safe place',
      dateFuture: 'The date must be in the future',
      greaterOrEqualThan: 'The value must be greater than than or equal to {value}',
      integer: 'Please type an integer',
      phoneFormat: 'Please type a valid phone',
      positiveInteger: 'The value must be greater than 0',
      required: 'This field is required',
      token: 'The field must contain between 2 and 6 characters',
      tokenDecimals: 'The decimals must be between 2 and 9',
      minZero: 'This field must be greater than 0',
      maxSeedsAvailable: 'This field must be less or equal than {amount}'
    }
  },
  menu: {
    transfer: 'Transfer',
    example: 'Example Dashboard',
    profile: 'Profile',
    logout: 'Logout'
  },
  pages: {
    index: {
      buttons: {
        createAccount: 'Create account',
        login: 'Login with Telos'
      }
    },
    general: {
      close: 'Close',
      search: 'Search',
      confirmActions: 'Do you want confirm this action?',
      noAccountsFound: 'No accounts found'
    },
    login: {
      getApp: 'Download the app',
      title: 'Select your wallet',
      selectAccount: 'Please select an account'
    },
    account: {
      myAccount: 'My Account',
      completeProfile: 'Complete your profile',
      generalInformation: 'General information',
      nickname: 'Nickname',
      timeZone: 'Time Zone',
      preferredFiatCurrency: 'Preferred Fiat Currency',
      paypalLink: 'Paypal Link',
      enterPaypalLink: 'Enter your paypal link',
      hintPaypal: 'Open link to confirm you write your profile link correctly'
    },
    mainTab: {
      seeds: 'Seeds',
      walletBalance: 'Available Balance',
      toSell: 'Sell SEEDS for Fiat',
      toBuy: 'Buy SEEDS with Fiat',
      recentActivity: 'Recent Activity',
      makeYour: 'Make your',
      firstTransaction: 'First Transaction',
      viewAll: 'View All'
    },
    sell: {
      toSell: 'Sell SEEDS for Fiat',
      defineTheSaleOffer: 'How many seeds would you like to sell?',
      crypto: 'Crypto',
      seeds: 'Seeds',
      amountOfCrypto: 'Amount of crypto',
      afterTransaction: 'After the transaction in your account will be {amount} seeds.',
      costPerCrypto: 'Cost per crypto',
      marketCost: 'Market cost {amount}',
      preferredCurrency: 'Preferred Currency',
      successMessage: 'Offer Sell was created success for {amount}.',
      confirmSale: 'Confirm Sale'
    },
    deposit: {
      deposit: 'Deposit',
      withdraw: 'Withdraw',
      amount: 'Amount',
      depositWithdraw: 'Deposit / Withdraw',
      selectTypeAction: 'Select the type of action',
      successDeposit: 'Success deposit for {amount}',
      successWithdraw: 'Success withdraw for {amount}'
    },
    balance: {
      balance: 'Balance',
      available: 'Available',
      swap: 'Swap',
      escrow: 'Escrow',
      total: 'Total',
      seeBalancesDetails: 'See balances details'
    }
  }
}
