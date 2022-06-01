import IApiFactory from '@/integration/IApiFactory'
import { Symbols } from '@/symbols'
import { BN } from '@polkadot/util'
import { inject, injectable } from 'inversify-props'
import ITransactionService from '../ITransactionService'
import IWalletService from '../IWalletService'

@injectable()
export default class TransactionService implements ITransactionService {
  private readonly wallet: IWalletService;

  constructor (
    @inject(Symbols.WalletFactory) walletFactory: () => IWalletService,
    @inject() private apiFactory: IApiFactory
  ) {
    this.wallet = walletFactory()
  }

  public async send (from: string, to: string, amount: string): Promise<void> {
    await this.wallet.transfer(from, to, new BN(amount))

    console.log(from, to, amount)
  }
}
