import { injectable, inject } from 'inversify-props'
import { IAccountRepository } from '../../repositories'
import { AccountInfoFormatted } from '@/models'
import { IBalanceFormatterService, IAccountService } from '@/services'
import { Guard } from '@/common'

// TODO remove later as probably not needed
@injectable()
export class AccountService implements IAccountService {
  constructor (
    @inject() private accountRepository: IAccountRepository,
    @inject() private balanceFormatterService: IBalanceFormatterService
  ) {
    if (!accountRepository) {
      throw new Error('accountRepository parameter not provided')
    }

    if (!balanceFormatterService) {
      throw new Error('balanceFormatterService parameter not provided')
    }
  }

  public async getAccount (address: string): Promise<AccountInfoFormatted> {
    Guard.ThrowIfUndefined('address', address)

    const account = await this.accountRepository.getAccount(address)

    const balanceFormatted = await this.balanceFormatterService.formatBalance(account.balance)
    const result = new AccountInfoFormatted(account.balance)
    result.balanceFormatted = balanceFormatted

    return result
  }
}
