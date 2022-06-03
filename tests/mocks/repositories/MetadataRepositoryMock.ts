/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMetadataRepository } from '@/repositories'
import { ChainMetadata } from '@/models'

export class MetadataRepositoryMock implements IMetadataRepository {
  public async getChainMetadata (): Promise<ChainMetadata> {
    return Promise.resolve(new ChainMetadata(18, 'ASTR'))
  }
}
