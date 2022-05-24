import XcmAsset from '@/models/XcmAsset'

export default interface IXcmRepository {
  getAssets(): Promise<XcmAsset[]>
}
