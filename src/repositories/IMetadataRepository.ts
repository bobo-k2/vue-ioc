import { ChainMetadata } from '@/models'

export interface IMetadataRepository {
  getChainMetadata(): Promise<ChainMetadata>
}
