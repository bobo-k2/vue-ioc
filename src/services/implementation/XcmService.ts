import { encodeAddress, decodeAddress } from '@polkadot/keyring'
import { hexToU8a, isHex } from '@polkadot/util'
import { XcmAsset, XcmBalance } from '@/models/XcmAsset'
import IXcmRepository from '@/repositories/IXcmRepository'
import { injectable, inject } from 'inversify-props'
import IXcmService from '../IXcmService'

@injectable()
export default class XcmService implements IXcmService {
  constructor (@inject() private xcmRepository: IXcmRepository) {
    if (!xcmRepository) {
      throw new Error('xcmRepository parameter not provided')
    }
  }

  public async getAssets (): Promise<XcmAsset[]> {
    return await this.xcmRepository.getAssets()
  }

  public async getBalances (address: string, assets: XcmAsset[]): Promise<XcmBalance[]> {
    if (this.isValidPolkadotAddress(address)) {
      return await this.xcmRepository.getBalances(address, assets)
    } else {
      return []
    }
  }

  // TODO move to util
  private isValidPolkadotAddress (address: string) {
    try {
      encodeAddress(
        isHex(address)
          ? hexToU8a(address)
          : decodeAddress(address)
      )
      return true
    } catch (error) {
      return false
    }
  }
}
