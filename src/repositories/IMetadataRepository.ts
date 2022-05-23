import ChainMetadata from '@/models/ChainMetadata'

export default interface IMetadataRepository {
  getChainMetadata(): Promise<ChainMetadata>
}
