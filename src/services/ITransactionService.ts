import { BN } from '@polkadot/util'

export default interface ITransactionService {
  send(from: string, to: string, amount: BN): Promise<void>
}
