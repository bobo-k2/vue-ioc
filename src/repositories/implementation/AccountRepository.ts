import { FrameSystemAccountInfo } from '@polkadot/types/lookup'
import IAccountRepository from '../IAccountRepository'
import { inject, injectable } from 'inversify-props'
import IApiFactory from '@/integration/IApiFactory'
import AccountInfo from '@/models/AccountInfo'

@injectable()
export default class AccountRepository implements IAccountRepository {
  constructor (@inject() private apiFactory: IApiFactory) {
    if (!apiFactory) {
      throw new Error('apiFactory parameter not provided')
    }
  }

  public async getAccount (address: string): Promise<AccountInfo> {
    const api = await this.apiFactory.getApi()
    const result = await api.query.system.account<FrameSystemAccountInfo>(address)

    return new AccountInfo(result.data.free.toBn())
  }
}
