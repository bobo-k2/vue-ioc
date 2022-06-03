import { BN } from '@polkadot/util'
import IMetadataRepository from '@/repositories/IMetadataRepository'
import { injectable, inject } from 'inversify-props'
import IBalanceFormatterService from '../IBalanceFormatterService'
import Guard from '@/common/Guard'

const DECIMALS = 4

@injectable()
export default class BalanceFormatterService implements IBalanceFormatterService {
  constructor (@inject() private metadataRepository: IMetadataRepository) {
    Guard.ThrowIfUndefined('metadataRepository', metadataRepository)
  }

  public async formatBalance (balance: BN): Promise<string> {
    Guard.ThrowIfUndefined('balance', balance)

    const metadata = await this.metadataRepository.getChainMetadata()

    // PoC implementation, improve
    const divisor = new BN(Math.pow(10, (metadata.decimals - DECIMALS)))
    const formattedBalance = balance.div(divisor).toNumber() /
      Math.pow(10, DECIMALS)

    return `${formattedBalance.toString()} ${metadata.token}`
  }
}
