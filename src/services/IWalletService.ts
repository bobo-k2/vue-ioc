import Account from '@/models/Account'
import AccountInfo from '@/models/AccountInfo'

export enum WalletType {
  Metamask = 'Metamask',
  Polkadot = 'Pokadot'
}

export default interface IWalletService {
  getAccounts (): Promise<Account[]>

  getBalance (address: string): Promise<AccountInfo>
}
