<template>
  <div>
    <h2>Select Wallet</h2>
    Current wallet: {{ wallet }}
    <div>
      <button v-if="!isMetamask()" @click="setMetamask()">Switch to Metamask</button>
      <button v-if="isMetamask()" @click="setPolkadot()">Switch to Polkadot</button>
    </div>
  </div>
</template>

<script lang="ts">
import { WalletType } from '@/services/IWalletService'
import { Vue } from 'vue-class-component'
import { Getter, Action } from 'vuex-class'

export default class WalletSelector extends Vue {
  @Getter
  private wallet!: WalletType

  @Action
  private setWallet!: (wallet: WalletType) => void

  private isMetamask (): boolean {
    return this.wallet === WalletType.Metamask
  }

  private setPolkadot (): void {
    this.setWallet(WalletType.Polkadot)
    this.$emit('walletChanged', WalletType.Polkadot)
  }

  private setMetamask (): void {
    this.setWallet(WalletType.Metamask)
    this.$emit('walletChanged', WalletType.Metamask)
  }
}
</script>
