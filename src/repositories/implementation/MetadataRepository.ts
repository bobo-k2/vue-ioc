import { inject, injectable } from 'inversify-props'
import IApiFactory from '@/integration/IApiFactory'
import IMetadataRepository from '../IMetadataRepository'
import ChainMetadata from '@/models/ChainMetadata'

@injectable()
export default class MetadataRepository implements IMetadataRepository {
  constructor (@inject() private apiFactory: IApiFactory) {
    if (!apiFactory) {
      throw new Error('apiFactory parameter not provided')
    }
  }

  public async getChainMetadata (): Promise<ChainMetadata> {
    const api = await this.apiFactory.getApi()
    const decimals = api.registry.chainDecimals[0]

    return new ChainMetadata(decimals)
  }
}
