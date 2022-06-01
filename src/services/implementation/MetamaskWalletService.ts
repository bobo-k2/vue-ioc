import { SubmittableExtrinsic } from '@polkadot/api/types'
import { BN } from '@polkadot/util'
import Web3 from 'web3'
import { TransactionConfig } from 'web3-eth'
import Account from '@/models/Account'
import IWalletService from '../IWalletService'
import AccountInfo from '@/models/AccountInfo'
import { inject, injectable } from 'inversify-props'
import IEventAggregator from '@/messaging/IEventAggregator'
import { BalanceChangedMessage } from '@/messaging/BalanceChangedMessage'

@injectable()
export default class MetamaskWalletService implements IWalletService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ethereum = (window as any).ethereum
  private web3!: Web3

  // eslint-disable-next-line no-useless-constructor
  constructor (@inject() private eventAggregator: IEventAggregator) {}

  public async getAccounts (): Promise<Account[]> {
    await this.checkExtension()
    const accounts = await this.web3.eth.getAccounts()

    const result: Account[] = []
    result.push(new Account(accounts[0]))

    return result
  }

  public async getBalance (address: string): Promise<AccountInfo> {
    const balance = await this.web3.eth.getBalance(address)

    return new AccountInfo(new BN(balance))
  }

  public async signAndSend (extrinsic: SubmittableExtrinsic<'promise'>, senderAddress: string): Promise<void> {
    // extrinsic.signAndSend()
    throw new Error('Not implemented')
  }

  public async transfer (from: string, to: string, amount: BN): Promise<void> {
    const rawTx: TransactionConfig = {
      nonce: await this.web3.eth.getTransactionCount(from),
      gasPrice: this.web3.utils.toHex(1575000000),
      from: from,
      to: to,
      value: amount // this.web3.utils.toWei(String(transferAmt), 'ether'),
    }

    console.log('Metamask transaction', rawTx)
    const estimatedGas = await this.web3.eth.estimateGas(rawTx)

    await this.web3.eth
      .sendTransaction({ ...rawTx, gas: estimatedGas })
      .once('confirmation', (confNumber, receipt) => {
        const hash = receipt.transactionHash
        console.log('transaction hash', hash)
        this.eventAggregator.publish(new BalanceChangedMessage(from))
        // callback(hash)
      })
  }

  private async checkExtension (): Promise<void> {
    if (typeof this.ethereum === 'undefined') {
      throw new Error('Metamask extension not installed.')
    }

    this.web3 = new Web3(this.ethereum)

    try {
      await this.ethereum.enable()
    } catch (error) {
      // user denied access
      console.error(error)
    }
  }
}
