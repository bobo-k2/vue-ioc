import XcmAsset from '@/models/XcmAsset'

export default interface IXcmService {
  getAssets(): Promise<XcmAsset[]>
}
