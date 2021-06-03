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
      confirm: 'Confirm',
      filter: 'Filter',
      waiting: 'Waiting...'
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
      noAccountsFound: 'No accounts found',
      filter: 'Filter'
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
      amountOfCrypto: 'Enter the amount of seeds to sell',
      afterTransaction: 'After the transaction in your account will be {amount} seeds.',
      costPerCrypto: 'Price ratio in percentage',
      marketCost: '100% (1 SEED) = {amount}',
      exchangeRateEqual: '1 SEED = {amount}',
      preferredCurrency: 'Preferred Currency',
      successMessage: 'Sell Offer was created success for {amount}.',
      confirmSale: 'Confirm Sale',
      sellAllSeeds: 'Sell all SEEDS',
      currentTotal: 'Current Total',
      amountToReceive: 'Amount to receive',
      exchangeRate: 'Exchange Rate',
      amountToSell: 'Amount to sell'
    },
    buy: {
      buySeeds: 'Buy SEEDS',
      offerDetail: 'Offer Detail',
      howManySeedsWillYouBuy: 'How many Seeds will you buy?',
      seedsAvailable: 'Seeds Available',
      seller: 'Seller',
      buyAllSeeds: 'Buy all Seeds',
      seedsToBuy: 'Seeds amount to buy',
      sendOffer: 'Send offer',
      reputation: 'Reputation Score',
      timeZone: 'Time Zone',
      status: 'Status',
      pricePerSEED: 'Price per SEED',
      fiatCurrency: 'Fiat Currency',
      confirmPurchase: 'Confirm Purchase',
      amountToBuy: 'Amount to Buy',
      amountToPay: 'Amount to pay',
      successMessage: 'Purchase Offer was created success for {amount}.',
      amountOfCrypto: 'Enter the amount of seeds to buy'
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
    },
    offers: {
      offers: 'Offers',
      buy: 'Buy',
      sale: 'Sale'
    },
    make_payment: {
      make_payment: 'Make payment'
    }
  }
}
