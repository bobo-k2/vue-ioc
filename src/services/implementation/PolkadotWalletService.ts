import { BN } from '@polkadot/util'
import Account from '@/models/Account'
import { Signer } from '@polkadot/types/types'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp'
import { InjectedExtension } from '@polkadot/extension-inject/types'
import { inject, injectable } from 'inversify-props'
import IWalletService from '../IWalletService'
import AccountInfo from '@/models/AccountInfo'
import IAccountRepository from '@/repositories/IAccountRepository'
import IApiFactory from '@/integration/IApiFactory'
import IEventAggregator from '@/messaging/IEventAggregator'
import { BalanceChangedMessage } from '@/messaging/BalanceChangedMessage'
import IBalanceFormatterService from '../IBalanceFormatterService'

@injectable()
export default class PolkadotWalletService implements IWalletService {
  private readonly extensions: InjectedExtension[] = [];

  constructor (
    @inject() private accountRepository: IAccountRepository,
    @inject() private apiFactory: IApiFactory,
    @inject() private eventAggregator: IEventAggregator,
    @inject() private balanceFormatterService: IBalanceFormatterService
  ) {
    if (!accountRepository) {
      throw new Error('accountRepository parameter not provided')
    }
  }

  public async getAccounts (): Promise<Account[]> {
    await this.checkExtension()
    const accounts = await web3Accounts()
    const result = accounts.map(x => {
      return new Account(x.address, x.meta.genesisHash, x.meta.name, x.meta.source)
    })

    return result
  }

  public async getBalance (address: string): Promise<AccountInfo> {
    return await this.accountRepository.getAccount(address)
  }

  public async signAndSend (extrinsic: SubmittableExtrinsic<'promise'>, senderAddress: string): Promise<void> {
    await extrinsic.signAndSend(senderAddress, {
      signer: await this.getSigner(senderAddress),
      nonce: -1
    },
    result => {
      console.log('Polkadot transaction status', result.status.toHuman())
      if (result.isFinalized) {
        this.eventAggregator.publish(new BalanceChangedMessage(senderAddress))
      }
    })
    // TODO handle errors
  }

  public async transfer (from: string, to: string, amount: BN): Promise<void> {
    const api = await this.apiFactory.getApi()
    await this.signAndSend(
      api.tx.balances.transfer(to, amount), from
    )
  }

  private async getSigner (address: string): Promise<Signer> {
    const sender = (await this.getAccounts()).find(x => x.address === address)

    if (sender) {
      const extension = this.extensions.find(x => x.name === sender.source)

      if (extension) {
        return extension.signer
      } else {
        throw new Error(`Can't find polkadot extension for ${sender.address}, ${sender.source}`)
      }
    } else {
      throw new Error(`Can't find account for ${address}`)
    }
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

      this.extensions.push(...extensions)
    }
  }

  // TODO move to common lib
  wait (ms: number): Promise<number> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
