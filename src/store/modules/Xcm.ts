import { XcmAsset, XcmBalance } from '@/models/XcmAsset'
import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { container, cid } from 'inversify-props'
import { IXcmService } from '@/services/IXcmService'

@Module
export default class Xcm extends VuexModule {
  public assetsList: XcmAsset[] = []
  public balanceList: XcmBalance[] = []

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

  @Action
  public async getBalances ({ address, assets }: { address: string; assets: XcmAsset[] }): Promise<void> {
    try {
      const xcmService = container.get<IXcmService>(cid.IXcmService)
      const balances = await xcmService.getBalances(address, assets)
      this.context.commit('setBalances', balances)
    } catch (error) {
      // TODO handle errors
      console.error(error)
    }
  }

  @Mutation
  public setAssets (assets: XcmAsset[]): void {
    this.assetsList = assets
  }

  @Mutation
  public setBalances (balances: XcmBalance[]): void {
    this.balanceList = balances
  }

  get assets (): XcmAsset[] {
    return this.assetsList
  }

  get balances (): XcmBalance[] {
    return this.balanceList
  }
}
