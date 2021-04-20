import BaseEosApi from './BaseEosApi'
import {
  Contracts
} from '~/const/Contracts'
// import User from '../domain/User'

class UserApi extends BaseEosApi {
  constructor ({
    eosApi,
    // accountName,
    notifier
  }) {
    super(
      eosApi,
      notifier,
      {
        contractAccount: Contracts.CONTRACT_SEEDS,
        table: 'users',
        tableId: 'account',
        defaultSortField: 'account'
      }
    )
    // this.accountName = accountName
  }

  /** *
     * Parse transfers base
     */
  // async _parseRows (rows, modifierProps) {
  //   const { hydrateRoles } = modifierProps
  //   return rows.map(async (row) => {
  //     const {
  //       account,
  //       user_name: userName,
  //       entity_id: entityId,
  //       type
  //     } = row
  //     const parsedRow = {
  //       account,
  //       userName,
  //       entityId,
  //       type
  //     }
  //     if (hydrateRoles) {
  //       const roles = await this.userRoleApi.fetchActorRoles(account)
  //       parsedRow.roles = roles
  //     }
  //     return parsedRow
  //   })
  // }
  /** *
  * Parse transfers base
  */
  async _parseRows (rows, modifierProps) {
    return rows
  }

  async checkExistUserSeeds ({ accountName }) {
    const userData = await this.fetchByIndex({
      scope: Contracts.CONTRACT_SEEDS,
      indexPosition: 1,
      indexValue: accountName
    })

    return {
      userExist: userData.rows.length === 1,
      userData: userData.rows[0]
    }
  }
}

export default UserApi
