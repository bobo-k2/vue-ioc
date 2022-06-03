import { u8aToString, BN } from '@polkadot/util'
import { QueryableStorageMultiArg } from '@polkadot/api/types'
import { PalletAssetsAssetAccount } from '@polkadot/types/lookup'
import { Option } from '@polkadot/types'
import { XcmAsset, XcmBalance } from '@/models/XcmAsset'
import { IXcmRepository } from '@/repositories'
import { injectable, inject } from 'inversify-props'
import { IApiFactory } from '@/integration'

@injectable()
export class XcmRepository implements IXcmRepository {
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
      const id = key.args.map(x => x.toString())[0]
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

  public async getBalances (address: string, assets: XcmAsset[]): Promise<XcmBalance[]> {
    const result: XcmBalance[] = []
    const queries: QueryableStorageMultiArg<'promise'>[] = []
    const api = await this.apiFactory.getApi()

    // Build and issue multi query request
    assets.map(x => queries.push([api.query.assets.account, [new BN(x.id), address]]))
    const balancesOption = await api.queryMulti<Option<PalletAssetsAssetAccount>[]>(queries)

    balancesOption.map((x, index) => {
      if (x.isSome) {
        const balance = x.unwrap()
        result.push(new XcmBalance(assets[index].id, balance.balance.toBn()))
      }
    })

    return result
  }
}
