import { SubmittableExtrinsic } from '@polkadot/api/types'
import { BN } from '@polkadot/util'
import Web3 from 'web3'
import Account from '@/models/Account'
import IWalletService from '../IWalletService'
import AccountInfo from '@/models/AccountInfo'
import { injectable } from 'inversify-props'

@injectable()
export default class MetamaskWalletService implements IWalletService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ethereum = (window as any).ethereum
  private web3!: Web3

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

  public async signAndSend (extrinsic: SubmittableExtrinsic<'promise'>): Promise<void> {
    // extrinsic.signAndSend()
    console.log(extrinsic.toHuman())
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
