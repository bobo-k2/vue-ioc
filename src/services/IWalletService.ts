import Account from '@/models/Account'

export default interface IWalletService {
  getAccounts (): Promise<Account[]>
}
