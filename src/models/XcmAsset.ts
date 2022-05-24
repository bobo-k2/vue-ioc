import { BN } from '@polkadot/util'

export default class XcmAsset {
  public id: string[]
  public deposit: BN
  public name: string
  public symbol: string
  public decimals: number
  public isFrozen: boolean

  constructor (
    id: string[],
    deposit: BN,
    name: string,
    symbol: string,
    decimals: number,
    isFrozen: boolean
  ) {
    this.id = id
    this.deposit = deposit
    this.name = name
    this.symbol = symbol
    this.decimals = decimals
    this.isFrozen = isFrozen
  }
}
