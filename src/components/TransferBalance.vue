<template>
  <div>
    <h2>Transfer Balance</h2>
    <div>From <b>{{ currentAcc?.address }}</b></div>
    <div>To <input type="text" v-model="to" /></div>
    <div>Amount <input type="text" v-model="balance" /></div>
    <div><button @click="sendBalance">Send</button></div>
  </div>
</template>

<script lang="ts">
import Account from '@/models/Account'
import AccountInfo from '@/models/AccountInfo'
import { Vue } from 'vue-class-component'
import { Getter } from 'vuex-class'
import { container, cid } from 'inversify-props'
import ITransactionService from '@/services/ITransactionService'

export default class AccountDetails extends Vue {
  @Getter
  private currentAcc!: Account

  @Getter
  private account!: AccountInfo

  @Getter
  private wallet!: string

  private to = ''

  private balance = '0'

  public sendBalance (): void {
    const service = container.get<ITransactionService>(cid.ITransactionService)
    service.send(this.currentAcc.address, this.to, this.balance)
    console.log(this.to, this.balance, service)
  }
}
</script>
