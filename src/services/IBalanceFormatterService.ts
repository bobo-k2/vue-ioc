import { BN } from '@polkadot/util'

export default interface IBalanceFormatterService {
  formatBalance(balance: BN): Promise<string>
}
