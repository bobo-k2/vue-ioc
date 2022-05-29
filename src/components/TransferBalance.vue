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

export default class AccountDetails extends Vue {
  @Getter
  private currentAcc!: Account

  @Getter
  private account!: AccountInfo

  private to = ''

  private balance = 0

  public sendBalance (): void {
    console.log(this.to, this.balance)
  }
}
</script>
