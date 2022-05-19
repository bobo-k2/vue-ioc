import { ApiPromise, WsProvider } from '@polkadot/api'
import { injectable } from 'inversify-props'
import IApi from '../IApi'

@injectable()
export default class Api implements IApi {
  private _api: ApiPromise;

  constructor (private _endpoint: string) {
    if (!_endpoint) {
      throw new Error('endpoint parameter not provided')
    }

    const provider = new WsProvider(_endpoint)
    this._api = new ApiPromise({ provider })
  }

  public async getApi (): Promise<ApiPromise> {
    return await this.connect()
  }

  private async connect (): Promise<ApiPromise> {
    return await this._api?.isReady
  }
}
