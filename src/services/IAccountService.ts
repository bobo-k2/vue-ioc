import { AccountInfoFormatted } from '@/models'

export interface IAccountService {
  getAccount(address: string): Promise<AccountInfoFormatted>
}
