import { SubmittableExtrinsic } from '@polkadot/api/types'
import { BN } from '@polkadot/util'
import { Account, AccountInfo } from '@/models'

export enum WalletType {
  Metamask = 'Metamask',
  Polkadot = 'Polkadot'
}

export interface IWalletService {
  getAccounts (): Promise<Account[]>

  getBalance (address: string): Promise<AccountInfo>

  signAndSend (extrinsic: SubmittableExtrinsic<'promise'>, senderAddress: string): Promise<void>

  transfer (from: string, to: string, amount: BN): Promise<void>
}
