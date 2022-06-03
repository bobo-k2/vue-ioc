/* eslint-disable @typescript-eslint/no-unused-vars */
import { BN } from '@polkadot/util'
import { AccountInfo } from '@/models'
import { IAccountRepository } from '@/repositories'

export class AccountRepositoryMock implements IAccountRepository {
  getAccount (address: string): Promise<AccountInfo> {
    return Promise.resolve(new AccountInfo(new BN('1000000000000000000')))
  }
}
