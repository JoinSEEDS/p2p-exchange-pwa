import BaseEosApi from './BaseEosApi'
import { Contracts } from '../const/Contracts'

class SettingsApi extends BaseEosApi {
  constructor ({ eosApi, notifier }) {
    super(eosApi, notifier, {
      contractAccount: Contracts.CONTRACT_P2P,
      table: 'config',
      tableId: 'key',
      defaultSortField: 'key'
    })
  }

  async _parseRows (rows, modifierProps) {
    return rows
  }

  async getSettings ({ offset, limit }) {
    const settings = await this.fetch({
      scope: Contracts.CONTRACT_P2P,
      offset,
      limit
    })
    return settings
  }
}

export default SettingsApi
