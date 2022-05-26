import { XcmAsset, XcmBalance } from '@/models/XcmAsset'

export default interface IXcmService {
  getAssets(): Promise<XcmAsset[]>

  getBalances(address: string, assets: XcmAsset[]): Promise<XcmBalance[]>
}
