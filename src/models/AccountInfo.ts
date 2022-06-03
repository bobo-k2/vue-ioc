import { BN } from '@polkadot/util'

export class AccountInfo {
  public balance: BN

  constructor (balance: BN) {
    this.balance = balance
  }
}
