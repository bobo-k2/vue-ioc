import XcmAsset from '@/models/XcmAsset'
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
}
