<template>
  <div>
    <div v-if="isBusy" id="overlay">
      <div id="text">Transaction in progress...</div>
    </div>
    <img alt="Astar logo" src="../assets/astar.png">
    <WalletSelector @wallet-changed="handleWalletChanged" />
    <hr />
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
      <h2>Balances</h2>
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
import { EventMessage } from '@/messaging/EventMessage'
import { SystemBusyMessage } from '@/messaging/SystemBusyMessage'

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

  @Getter
  private isBusy!: boolean

  @Action
  private getAssets!: () => Promise<void>

  @Action
  private getBalances!: ({ address, assets }: { address: string; assets: XcmAsset[] }) => Promise<void>

  @Action
  private getAccounts!: () => Promise<void>

  @Action
  getAccountInfo!: (address: string) => Promise<void>

  @Action
  setisBusyFlag!: (isBusy: boolean) => void

  async mounted (): Promise<void> {
    await this.loadData()

    // Subscribe to event messages
    const aggregator = container.get<IEventAggregator>(cid.IEventAggregator)
    aggregator.subscribe(BalanceChangedMessage.name, this.balanceChangedCallback)
    aggregator.subscribe(SystemBusyMessage.name, this.systemBusyCallback)
  }

  async unmounted (): Promise<void> {
    // unsubscribe from event messages
    const aggregator = container.get<IEventAggregator>(cid.IEventAggregator)
    aggregator.unsubscribe(BalanceChangedMessage.name, this.balanceChangedCallback)
    aggregator.unsubscribe(SystemBusyMessage.name, this.systemBusyCallback)
  }

  findBalance (assetId: string): BN | undefined {
    return this.balances.find(x => x.assetId === assetId)?.balance
  }

  async handleWalletChanged (): Promise<void> {
    await this.loadData()
  }

  private async balanceChangedCallback (m: EventMessage): Promise<void> {
    const message = m as BalanceChangedMessage
    console.log(`Balance for account ${message.accountAddress} changed. Reading a new balance.`)
    await this.getAccountInfo(message.accountAddress)
    this.setisBusyFlag(false)
  }

  private systemBusyCallback (m: EventMessage): void {
    const message = m as SystemBusyMessage
    console.log('isBusy changed', message.isBusy)
    this.setisBusyFlag(message.isBusy)
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

<style>
#overlay {
  position: fixed; /* Sit on top of the page content */
  display: block; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.8); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
}

#text{
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 50px;
  color: white;
  transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
}
</style>
