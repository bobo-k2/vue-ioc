import { container, cid } from 'inversify-props'
import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { BN } from '@polkadot/util'
import AccountInfo from '../../models/AccountInfo'
import IAccountService from '../../services/IAccountService'

@Module
export default class General extends VuexModule {
  public accountInfo: AccountInfo | null = null

  @Action({ rawError: true })
  public async getAccountInfo (): Promise<void> {
    try {
      const accountService = container.get<IAccountService>(cid.IAccountService)
      const accountInfo = await accountService.getAccount('XLoLJBQoMPHMLXYhdFobSpH5GujRoUH8d1sUtaEtoBG7zaS')
      this.context.commit('setAccountInfo', accountInfo)
    } catch (error) {
      console.error(error)
    }
  }

  @Mutation
  public setAccountInfo (newAccountInfo: AccountInfo): void {
    this.accountInfo = newAccountInfo
  }

  get account (): AccountInfo {
    return this.accountInfo !== null ? this.accountInfo : new AccountInfo(new BN(0))
  }
}