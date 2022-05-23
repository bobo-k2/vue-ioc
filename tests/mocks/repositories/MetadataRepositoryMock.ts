/* eslint-disable @typescript-eslint/no-unused-vars */
import IMetadataRepository from '@/repositories/IMetadataRepository'
import ChainMetadata from '@/models/ChainMetadata'

export class MetadataRepositoryMock implements IMetadataRepository {
  public async getChainMetadata (): Promise<ChainMetadata> {
    return Promise.resolve(new ChainMetadata(18))
  }
}
