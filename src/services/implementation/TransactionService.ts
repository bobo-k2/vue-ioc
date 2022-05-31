import { Symbols } from '@/symbols'
import { BN } from '@polkadot/util'
import { inject, injectable } from 'inversify-props'
import ITransactionService from '../ITransactionService'
import IWalletService from '../IWalletService'

@injectable()
export default class TransactionService implements ITransactionService {
  private readonly wallet: IWalletService;

  constructor (@inject(Symbols.WalletFactory) walletFactory: () => IWalletService) {
    this.wallet = walletFactory()
    console.log('wallet', this.wallet)
  }

  public async send (from: string, to: string, amount: BN): Promise<void> {
    console.log(from, to, amount)
  }
}
