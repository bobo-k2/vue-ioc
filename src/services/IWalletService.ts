import { SubmittableExtrinsic } from '@polkadot/api/types'
import { BN } from '@polkadot/util'
import Account from '@/models/Account'
import AccountInfo from '@/models/AccountInfo'

export enum WalletType {
  Metamask = 'Metamask',
  Polkadot = 'Polkadot'
}

export default interface IWalletService {
  getAccounts (): Promise<Account[]>

  getBalance (address: string): Promise<AccountInfo>

  signAndSend (extrinsic: SubmittableExtrinsic<'promise'>, senderAddress: string): Promise<void>

  transfer (from: string, to: string, amount: BN): Promise<void>
}
