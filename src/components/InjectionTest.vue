<template>
  <div>
    <div>
      <h2>Account balance is</h2>
      <div>{{ account.balance }}</div>
      <div>{{ account.balanceFormatted }}</div>
    </div>
    <div>
      <h2>Assets</h2>
      <div v-for="(asset, index) in assets" :key="index">
        {{ asset.name }} [{{ asset.symbol }}] [{{ findBalance(asset.id) }}]
      </div>
    </div>
    <div>
      <h2>balances</h2>
      <div v-for="(balance, index) in balances" :key="index">
        {{ balance.assetId }} [{{ balance.balance }}]
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { BN } from '@polkadot/util'
import AccountInfo from '@/models/AccountInfo'
import { XcmAsset, XcmBalance } from '@/models/XcmAsset'
import { Vue } from 'vue-class-component'
import { Action, Getter } from 'vuex-class'
import Account from '@/models/Account'

export default class InjectionTest extends Vue {
  @Getter
  private account!: AccountInfo

  @Getter
  private assets!: XcmAsset[]

  @Getter
  private balances!: XcmBalance[]

  @Action
  private getAssets!: () => Promise<XcmAsset[]>

  @Action
  private getBalances!: ({ address, assets }: { address: string; assets: XcmAsset[] }) => Promise<void>

  @Action
  private setCurrentAddress!: (address: string) => void

  @Action
  private getAccounts!: () => Promise<Account[]>

  async mounted (): Promise<void> {
    await this.getAccounts()
    const address = 'XLoLJBQoMPHMLXYhdFobSpH5GujRoUH8d1sUtaEtoBG7zaS'
    this.setCurrentAddress(address)
    await this.getAssets()
    await this.getBalances({ address, assets: this.assets })
  }

  findBalance (assetId: string): BN | undefined {
    return this.balances.find(x => x.assetId === assetId)?.balance
  }
}
</script>
