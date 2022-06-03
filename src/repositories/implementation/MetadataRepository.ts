import { inject, injectable } from 'inversify-props'
import { IApiFactory } from '@/integration'
import { IMetadataRepository } from '@/repositories'
import { ChainMetadata } from '@/models'

@injectable()
export class MetadataRepository implements IMetadataRepository {
  constructor (@inject() private apiFactory: IApiFactory) {
    if (!apiFactory) {
      throw new Error('apiFactory parameter not provided')
    }
  }

  public async getChainMetadata (): Promise<ChainMetadata> {
    const api = await this.apiFactory.getApi()
    const decimals = api.registry.chainDecimals[0]
    const token = api.registry.chainTokens[0]

    return new ChainMetadata(decimals, token)
  }
}
