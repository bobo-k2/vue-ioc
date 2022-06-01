<template>
  <div>
    <WalletSelector @wallet-changed="handleWalletChanged" />
    <br />
    <Accounts />
    <hr />
    <AccountDetails />
    <hr />
    <TransferBalance />
    <hr />
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
import { XcmAsset, XcmBalance } from '@/models/XcmAsset'
import { Vue, Options } from 'vue-class-component'
import { Action, Getter } from 'vuex-class'
import Account from '@/models/Account'
import Accounts from './Accounts.vue'
import AccountDetails from './AccountDetails.vue'
import WalletSelector from './WalletSelector.vue'
import TransferBalance from './TransferBalance.vue'
import { container, cid } from 'inversify-props'
import IEventAggregator from '@/messaging/IEventAggregator'
import { BalanceChangedMessage } from '@/messaging/BalanceChangedMessage'

@Options({
  components: {
    Accounts,
    AccountDetails,
    WalletSelector,
    TransferBalance
  }
})
export default class InjectionTest extends Vue {
  @Getter
  private assets!: XcmAsset[]

  @Getter
  private balances!: XcmBalance[]

  @Getter
  private currentAcc!: Account

  @Action
  private getAssets!: () => Promise<void>

  @Action
  private getBalances!: ({ address, assets }: { address: string; assets: XcmAsset[] }) => Promise<void>

  @Action
  private getAccounts!: () => Promise<void>

  @Action
  getAccountInfo!: (address: string) => Promise<void>

  async mounted (): Promise<void> {
    await this.loadData()

    // Subscribe to balance changed message
    const aggregator = container.get<IEventAggregator>(cid.IEventAggregator)
    aggregator.subscribe(BalanceChangedMessage.name, async (m) => {
      const message = m as BalanceChangedMessage
      console.log(`Balance for account ${message.accountAddress} changed. Reading a new balance.`)
      await this.getAccountInfo(message.accountAddress)
    })
  }

  findBalance (assetId: string): BN | undefined {
    return this.balances.find(x => x.assetId === assetId)?.balance
  }

  async handleWalletChanged (): Promise<void> {
    await this.loadData()
  }

  private async loadData (): Promise<void> {
    await this.getAccounts()
    await this.getAssets()

    const address = this.currentAcc.address
    await this.getAccountInfo(address)
    await this.getBalances({ address, assets: this.assets })
  }
}
</script>
