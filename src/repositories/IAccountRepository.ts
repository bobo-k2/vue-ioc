import AccountInfo from '@/models/AccountInfo'

export default interface IAccountRepository {
  getAccount(address: string): Promise<AccountInfo>
}
