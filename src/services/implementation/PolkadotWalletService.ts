import Account from '@/models/Account'
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp'
import { InjectedExtension } from '@polkadot/extension-inject/types'
import { injectable } from 'inversify-props'
import IWalletService from '../IWalletService'

@injectable()
export default class PolkadotWalletService implements IWalletService {
  private readonly extensions: InjectedExtension[] = [];

  public async getAccounts (): Promise<Account[]> {
    await this.checkExtension()
    const accounts = await web3Accounts()
    const result = accounts.map(x => {
      return new Account(x.address, x.meta.genesisHash, x.meta.name)
    })

    return result
  }

  private async checkExtension (): Promise<void> {
    if (this.extensions.length === 0) {
      const maxRetryCount = 10
      let retryCount = 0
      let extensions: InjectedExtension[] = []
      do {
        extensions = await web3Enable('Astar portal')
        await this.wait(100)
        retryCount++
      } while (extensions.length === 0 && retryCount <= maxRetryCount)

      if (extensions.length === 0) {
        throw new Error('Polkadot extension not installed.')
      }

      // TODO see how to handle multiple extensions
      this.extensions.push(...extensions)
    }
  }

  // TODO move to common lib
  wait (ms: number): Promise<number> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
