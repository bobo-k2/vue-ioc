import { ApiPromise } from '@polkadot/api'

export interface IApiFactory {
  getApi(): Promise<ApiPromise>

  getApiByEndpoint(endpoint: string): Promise<ApiPromise>
}
