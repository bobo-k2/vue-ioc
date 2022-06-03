import { BN } from '@polkadot/util'

export interface IBalanceFormatterService {
  formatBalance(balance: BN): Promise<string>
}
