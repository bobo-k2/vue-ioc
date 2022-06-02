import { EventMessage } from './EventMessage'

export class SystemBusyMessage extends EventMessage {
  public isBusy: boolean

  constructor (isBusy: boolean) {
    super()
    this.isBusy = isBusy
  }
}
