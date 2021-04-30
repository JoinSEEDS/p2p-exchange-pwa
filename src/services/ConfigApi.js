import BaseEosApi from './BaseEosApi'
import {
  Contracts
} from '~/const/Contracts'

class ConfigApi extends BaseEosApi {
  constructor ({
    eosApi,
    notifier
  }) {
    super(
      eosApi,
      notifier,
      {
        contractAccount: Contracts.CONTRACT_SEEDS,
        table: 'config',
        tableId: 'id',
        defaultSortField: 'account'
      }
    )
  }

  /** *
  * Parse transfers base
  */
  async _parseRows (rows, modifierProps) {
    return rows
  }

  async getConfigs ({ offset, limit }) {
    const configs = await this.fetch({
      scope: Contracts.CONTRACT_P2P,
      offset,
      limit
    })
    return configs
  }
}

export default ConfigApi
