import { container } from 'inversify-props'
import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { BN } from '@polkadot/util'
import AccountInfoFormatted from '@/models/AccountInfoFormatted'
import Account from '@/models/Account'
import IWalletService, { WalletType } from '@/services/IWalletService'

@Module
export default class General extends VuexModule {
  public currentAddress = ''
  public accountInfo: AccountInfoFormatted | null = null
  public accountList: Account[] = []
  public currentAccount: Account | null = null
  private currentWallet: WalletType = WalletType.Polkadot

  @Action({ rawError: true })
  public async getAccountInfo (address: string): Promise<void> {
    try {
      const wallet = container.get<IWalletService>(this.currentWallet)
      const accountInfo = await wallet.getBalance(address)
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
      const walletService = container.get<IWalletService>(this.currentWallet)
      const accounts = await walletService.getAccounts()
      this.context.commit('setAccounts', accounts)

      if (accounts.length > 0) {
        this.context.commit('setCurrentAccount', accounts[0])
      }
    } catch (error) {
      console.error(error)
    }
  }

  @Action
  public setWallet (wallet: WalletType): void {
    this.context.commit('setCurrentWallet', wallet)
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

  @Mutation
  public setCurrentWallet (wallet: WalletType): void {
    this.currentWallet = wallet
  }

  get account (): AccountInfoFormatted {
    return this.accountInfo !== null ? this.accountInfo : new AccountInfoFormatted(new BN(0))
  }

  get address (): string {
    return this.currentAddress
  }

  get accounts (): Account[] {
    return this.accountList
  }

  get currentAcc (): Account | null {
    return this.currentAccount
  }

  get wallet (): WalletType {
    return this.currentWallet
  }
}
