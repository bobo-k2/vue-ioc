import { u8aToString } from '@polkadot/util'
import XcmAsset from '@/models/XcmAsset'
import IXcmRepository from '@/repositories/IXcmRepository'
import { injectable, inject } from 'inversify-props'
import IApiFactory from '@/integration/IApiFactory'

@injectable()
export default class XcmRepository implements IXcmRepository {
  constructor (@inject() private apiFactory: IApiFactory) {
    if (!apiFactory) {
      throw new Error('apiFactory parameter not provided')
    }
  }

  public async getAssets (): Promise<XcmAsset[]> {
    const api = await this.apiFactory.getApi()
    const metadata = await api.query.assets.metadata.entries()

    const result: XcmAsset[] = []
    metadata.forEach(([key, value]) => {
      const id = key.args.map(x => x.toString())
      const deposit = value.deposit.toBn()
      const name = u8aToString(value.name)
      const symbol = u8aToString(value.symbol)
      const decimals = value.decimals.toNumber()
      const isFrozen = value.isFrozen.valueOf()

      const asset = new XcmAsset(id, deposit, name, symbol, decimals, isFrozen)

      result.push(asset)
    })

    return result
  }
}
