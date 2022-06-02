<template>
  <div>
    <h2>Transfer</h2>
    <div>From: <b>{{ currentAcc?.address }}</b></div>
    <div class="row">
      <div class="label">To</div>
      <input type="text" v-model="to" />
    </div>
    <div class="row">
      <div class="label">Amount</div>
      <input type="text" v-model="balance" />
    </div>
    <div><button @click="sendBalance">Send</button></div>
  </div>
</template>

<script lang="ts">
import Account from '@/models/Account'
import AccountInfo from '@/models/AccountInfo'
import { Vue } from 'vue-class-component'
import { Getter, Action } from 'vuex-class'
import { container, cid } from 'inversify-props'
import ITransactionService from '@/services/ITransactionService'

export default class AccountDetails extends Vue {
  @Getter
  private currentAcc!: Account

  @Getter
  private account!: AccountInfo

  @Getter
  private wallet!: string

   @Action
  getAccountInfo!: (address: string) => Promise<void>

  private to = ''

  private balance = '0'

  public async sendBalance (): Promise<void> {
    const service = container.get<ITransactionService>(cid.ITransactionService)
    await service.send(this.currentAcc.address, this.to, this.balance)
  }
}
</script>

<style scoped>
  input, button {
    padding: 10px;
    margin: 10px;
    font-size: 16px;
  }

  input {
    width: 400px;
  }

  button {
    min-width: 100px;
  }

  .label {
    width: 70px;
    text-align: right;
  }

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
</style>
