import { container, cid } from 'inversify-props'
import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { BN } from '@polkadot/util'
import IAccountService from '../../services/IAccountService'
import AccountInfoFormatted from '@/models/AccountInfoFormatted'
import Account from '@/models/Account'
import IWalletService from '@/services/IWalletService'

@Module
export default class General extends VuexModule {
  public currentAddress = ''
  public accountInfo: AccountInfoFormatted | null = null
  public accountList: Account[] = []
  public currentAccount: Account | null = null

  @Action({ rawError: true })
  public async getAccountInfo (address: string): Promise<void> {
    try {
      const accountService = container.get<IAccountService>(cid.IAccountService)
      const accountInfo = await accountService.getAccount(address)
      this.context.commit('setAccountInfo', accountInfo)
    } catch (error) {
      console.error(error)
    }
  }

  @Action
  public async setCurrentAddress (address: string): Promise<void> {
    this.context.commit('setAddress', address)

    if (address) {
      this.context.dispatch('getAccountInfo', address)
    }
  }

  @Action
  public async getAccounts (): Promise<void> {
    try {
      const walletService = container.get<IWalletService>('PolkadotWalletService')
      const accounts = await walletService.getAccounts()
      this.context.commit('setAccounts', accounts)

      if (accounts.length > 0) {
        this.context.commit('setCurrentAccount', accounts[0])
      }
    } catch (error) {
      console.error(error)
    }
  }

  @Mutation
  public setAccountInfo (newAccountInfo: AccountInfoFormatted): void {
    this.accountInfo = newAccountInfo
  }

  @Mutation
  public setAccounts (newAccounts: Account[]): void {
    this.accountList = newAccounts
  }

  @Mutation
  public setAddress (address: string): void {
    this.currentAddress = address
  }

  @Mutation
  public setCurrentAccount (account: Account): void {
    this.currentAccount = account
  }

  get account (): AccountInfoFormatted {
    return this.accountInfo !== null ? this.accountInfo : new AccountInfoFormatted(new BN(0))
  }

  get address (): string {
    return this.currentAddress
  }

  get accounts (): Account[] {
    return this.accounts
  }
}
