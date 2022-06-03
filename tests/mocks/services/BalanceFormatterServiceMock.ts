import { IBalanceFormatterService } from '@/services'
import { BN } from '@polkadot/util'

const DECIMALS = 4
const CHAIN_DECIMAL = 18
const TOKEN = 'ASTR'

export class BalanceFormatterServiceMock implements IBalanceFormatterService {
  public async formatBalance (balance: BN): Promise<string> {
    const divisor = new BN(Math.pow(10, (CHAIN_DECIMAL - DECIMALS)))
    const formattedBalance = balance.div(divisor).toNumber() /
      Math.pow(10, DECIMALS)

    return `${formattedBalance.toString()} ${TOKEN}`
  }
}
