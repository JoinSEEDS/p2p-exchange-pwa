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
      waiting: 'Waiting for Seller to accept',
      make_payment: 'Make Payment',
      view_details: 'View Details',
      confirm_payment: 'Confirm Payment',
      dismiss: 'Dismiss',
      waiting_payment: 'Waiting for Payment...',
      rejected: 'Rejected',
      waiting_payment_confirmation: 'Waiting for Payment Confirmation',
      init_arbitrage: 'Init Arbitrage',
      arbitrage: 'Awaiting for Arbitrage',
      sendContactMethod: 'Send Contact Method to Arbitrage',
      sentContactMethod: 'Waiting for arbitrage resolution'
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
      maxSeedsAvailable: 'This field must be less or equal than {amount}',
      email: 'The field is not a valid email',
      internationalNumber: 'The field is not a valid number phone'
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
      hintPaypal: 'Open link to confirm you write your profile link correctly',
      saved: 'Account saved succesfully',
      email: 'Email',
      signal: 'Signal Number'
    },
    mainTab: {
      seeds: 'Seeds',
      walletBalance: 'Available Balance',
      toSell: 'Sell SEEDS for Fiat',
      toBuy: 'Buy SEEDS with Fiat',
      recentActivity: 'Recent Activity',
      makeYour: 'Make your',
      firstTransaction: 'First Transaction',
      viewAll: 'View All',
      actions: 'Actions'
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
      successMessage: 'Sell Offer was created successfully for {amount}.',
      confirmSale: 'Confirm Sale',
      sellAllSeeds: 'Sell all SEEDS',
      currentTotal: 'Current Total',
      amountToReceive: 'Amount to receive',
      exchangeRate: 'Exchange Rate',
      amountToSell: 'Amount to sell',
      confirm_payment: 'Before confirming the payment, we suggest you verify that the balance of this transaction is in your account.',
      available: 'Available: {amount}',
      percentage: 'Percentage: {percentage}',
      sold: 'Sold: {sold}',
      waiting: 'Your offer is pending of approval.',
      details: 'Details:',
      cancel: 'Cancel'
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
      successMessage: 'Purchase Offer was created successfully for {amount}.',
      amountOfCrypto: 'Enter the amount of seeds to buy',
      cancel: 'Cancel buy offer',
      confirm_cancel: 'Are you sure of canceling this offer?',
      existing_offer: 'An offer already exists for this sale offer',
      buyer: 'Buyer'
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
      sale: 'Sales',
      timeZone: 'Time Zone',
      fiatCurrency: 'Fiat Currency',
      filterBy: 'Filter By',
      timeTo: '{time} remaining to accept the offer.',
      accept_buy_offer: 'Offer accepted successfully',
      confirm_payment: 'Offer payment confirmed successfully',
      reject_buy_offer: 'Offer rejected successfully',
      make_first: 'Make your first',
      sell_offer: 'Sell Offer',
      buy_offer: 'Buy Offer'
    },
    make_payment: {
      make_payment: 'Make payment',
      has_accepted: 'has accepted your purchase offer.',
      to_complete: 'To complete the purchase, make the payment through PayPal to the following account.',
      more_info: 'More information',
      confirm: 'Confirm payment',
      success_pay: 'Offer paid succesfully',
      copy: 'Copy!'
    },
    buy_offer: {
      buy_offer: 'Buy Offer',
      buy_token: 'wants to buy you {token}.',
      reputation: 'Reputation',
      total_transaction: 'Total Transaction',
      user: 'User',
      time_zone: 'Time zone'
    },
    incoming_offers: {
      incoming_offers: 'Details of my sale offer',
      proposals: 'Purchase proposals',
      percentage: 'Percentage',
      sold: 'Sold',
      no_offers: 'This sell offer has not',
      not_yet: 'Purchase offers yet',
      finished: 'Finished successfully'
    },
    arbitration: {
      arbitration: 'Arbitration',
      available: 'Available',
      assigned: 'Assigned',
      ticket: 'Ticket',
      buyer: 'Buyer: {buyer}',
      seller: 'Seller: {seller}',
      follow_up: 'Follow Up',
      view_details: 'View details',
      close_ticket: 'Close ticket',
      close_ticket_favor: 'Close ticket in favor of:',
      explain_reasons: 'Please explain the reasons of the judgement*:',
      sure_close_ticket: 'Are you sure to close Ticket {id}? this action cannot be reversed.',
      contact_methods_sent: 'Contact methods sent to arbiter',
      payment_method_available: 'Payment method not available',
      flagged_to: 'Flagged to: ',
      non_available: 'No Tickets Available'
    }
  }
}
