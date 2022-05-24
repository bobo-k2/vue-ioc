import XcmAsset from '@/models/XcmAsset'
import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { container, cid } from 'inversify-props'
import IXcmService from '@/services/IXcmService'

@Module
export default class Xcm extends VuexModule {
  public assetsList: XcmAsset[] = []

  @Action
  public async getAssets (): Promise<void> {
    try {
      const xcmService = container.get<IXcmService>(cid.IXcmService)
      const assets = await xcmService.getAssets()
      this.context.commit('setAssets', assets)
    } catch (error) {
      // TODO handle errors
      console.error(error)
    }
  }

  @Mutation
  public setAssets (assets: XcmAsset[]): void {
    this.assetsList = assets
  }

  get assets (): XcmAsset[] {
    return this.assetsList
  }
}
