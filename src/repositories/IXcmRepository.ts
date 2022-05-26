import { XcmAsset, XcmBalance } from '@/models/XcmAsset'

export default interface IXcmRepository {
  getAssets(): Promise<XcmAsset[]>

  getBalances(address: string, assets: XcmAsset[]): Promise<XcmBalance[]>
}
