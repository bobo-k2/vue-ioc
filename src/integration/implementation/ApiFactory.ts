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

  public async getApiByEndpoint (endpoint: string): Promise<ApiPromise> {
    let api = this._instances.get(endpoint)

    if (api) {
      return await api.getApi()
    }

    api = new Api(endpoint)
    this._instances.set(endpoint, api)

    return await api.getApi()
  }

  public async getApi (): Promise<ApiPromise> {
    const currentEndpoint = this.networkService.getCurrentNetwork().endpoint
    return await this.getApiByEndpoint(currentEndpoint)
  }
}
