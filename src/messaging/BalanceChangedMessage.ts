import { EventMessage } from './EventMessage'

export class BalanceChangedMessage extends EventMessage {
  public accountAddress: string

  constructor (accountAddress: string) {
    super()
    this.accountAddress = accountAddress
  }
}
