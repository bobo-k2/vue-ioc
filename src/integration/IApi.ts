import { ApiPromise } from '@polkadot/api'

export default interface IApi {
  getApi(): Promise<ApiPromise>
}
