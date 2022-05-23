/* eslint-disable @typescript-eslint/no-unused-vars */
import { BN } from '@polkadot/util'
import AccountInfo from '@/models/AccountInfo'
import IAccountRepository from '@/repositories/IAccountRepository'

export class AccountRepositoryMock implements IAccountRepository {
  getAccount (address: string): Promise<AccountInfo> {
    return Promise.resolve(new AccountInfo(new BN('1000000000000000000')))
  }
}
