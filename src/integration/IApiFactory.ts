import { ApiPromise } from '@polkadot/api'

export default interface IApiFactory {
  getApi(): Promise<ApiPromise>;
}
