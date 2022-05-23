<template>
  <div>a</div>
</template>

<script lang="ts">
import AccountInfo from '@/models/AccountInfo'
import { Vue } from 'vue-class-component'
import { Action, Getter } from 'vuex-class'
// import { inject } from 'inversify-props'
// import IAccountService from '../services/IAccountService'

export default class InjectionTest extends Vue {
  // BE CAREFUL. By convention property name should match interface name
  // @inject() private accountService!: IAccountService

  @Getter
  private account!: AccountInfo

  @Action
  private getAccountInfo!: () => Promise<void>

  async mounted (): Promise<void> {
    // const res = await this.accountService.getAccount('XLoLJBQoMPHMLXYhdFobSpH5GujRoUH8d1sUtaEtoBG7zaS')

    // console.log(res.balance.toString())
    console.log('fetching!')
    await this.getAccountInfo()
  }
}
</script>
