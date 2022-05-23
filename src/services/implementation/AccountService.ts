import { injectable, inject } from 'inversify-props'
import IAccountService from '../IAccountService'
import IAccountRepository from '../../repositories/IAccountRepository'
import AccountInfo from '@/models/AccountInfo'

@injectable()
export default class AccountService implements IAccountService {
  constructor (@inject() private accountRepository: IAccountRepository) {
    if (!accountRepository) {
      throw new Error('accountRepository parameter not provided')
    }
  }

  public async getAccount (address: string): Promise<AccountInfo> {
    const account = await this.accountRepository.getAccount(address)

    // TODO Some logic goes here.
    // const result = new AccountInfo(account.data.free.toBn())

    return account
  }
}
