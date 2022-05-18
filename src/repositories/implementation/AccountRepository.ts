import { FrameSystemAccountInfo } from '@polkadot/types/lookup'
import IAccountRepository from '../IAccountRepository'
import IApi from '../../integration/IApi'

export default class AccountRepository implements IAccountRepository {
  constructor (private _api: IApi) {
    if (!_api) {
      throw new Error('api parameter not provided')
    }
  }

  public async getAccount (address: string): Promise<FrameSystemAccountInfo> {
    const api = await this._api.getApi()
    return await api.query.system.account(address)
  }
}
