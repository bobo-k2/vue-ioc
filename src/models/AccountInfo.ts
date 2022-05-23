import { BN } from '@polkadot/util'

export default class AccountInfo {
  public balance: BN

  constructor (balance: BN) {
    this.balance = balance
  }
}
