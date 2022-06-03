import { AccountInfo } from '@/models'

export interface IAccountRepository {
  getAccount(address: string): Promise<AccountInfo>
}
