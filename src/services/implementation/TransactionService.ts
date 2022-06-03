import IEventAggregator from '@/messaging/IEventAggregator'
import { SystemBusyMessage } from '@/messaging/SystemBusyMessage'
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
    @inject() private eventAggregator: IEventAggregator
  ) {
    this.wallet = walletFactory()
  }

  public async send (from: string, to: string, amount: string): Promise<void> {
    this.eventAggregator.publish(new SystemBusyMessage(true))
    await this.wallet.transfer(from, to, new BN(amount))
  }
}
