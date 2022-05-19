import { ApiPromise } from '@polkadot/api'
import { inject, injectable } from 'inversify-props'
import IApi from '../IApi'
import IApiFactory from '../IApiFactory'
import INetworkService from '../INetworkService'
import Api from './Api'

@injectable()
export default class ApiFactory implements IApiFactory {
  private _instances = new Map<string, IApi>();

  constructor (@inject() private networkService: INetworkService) {
    if (!networkService) {
      throw new Error('networkService parameter is not defined.')
    }
  }

  public async getApi (): Promise<ApiPromise> {
    const currentEndpoint = this.networkService.getCurrentNetwork().endpoint
    let api = this._instances.get(currentEndpoint)

    if (api) {
      return await api.getApi()
    }

    api = new Api(currentEndpoint)
    this._instances.set(currentEndpoint, api)

    return await api.getApi()
  }
}
