import { FrameSystemAccountInfo } from '@polkadot/types/lookup'
import IAccountRepository from '../IAccountRepository'
import { inject, injectable } from 'inversify-props'
import IApiFactory from '@/integration/IApiFactory'

@injectable()
export default class AccountRepository implements IAccountRepository {
  constructor (@inject() private apiFactory: IApiFactory) {
    if (!apiFactory) {
      throw new Error('apiFactory parameter not provided')
    }
  }

  public async getAccount (address: string): Promise<FrameSystemAccountInfo> {
    const api = await this.apiFactory.getApi()
    return await api.query.system.account(address)
  }
}
