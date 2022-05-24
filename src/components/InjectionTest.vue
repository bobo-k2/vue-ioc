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
        {{ asset.name }} [{{ asset.symbol }}]
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AccountInfo from '@/models/AccountInfo'
import XcmAsset from '@/models/XcmAsset'
import { Vue } from 'vue-class-component'
import { Action, Getter } from 'vuex-class'

export default class InjectionTest extends Vue {
  @Getter
  private account!: AccountInfo

  @Getter
  private assets!: XcmAsset[]

  @Action
  private getAssets!: () => Promise<void>

  @Action
  private setCurrentAddress!: (address: string) => void

  async mounted (): Promise<void> {
    this.setCurrentAddress('XLoLJBQoMPHMLXYhdFobSpH5GujRoUH8d1sUtaEtoBG7zaS')
    await this.getAssets()
  }
}
</script>
