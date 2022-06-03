import { XcmAsset, XcmBalance } from '@/models/XcmAsset'

export interface IXcmService {
  getAssets(): Promise<XcmAsset[]>

  getBalances(address: string, assets: XcmAsset[]): Promise<XcmBalance[]>
}
