<template>
  <div>
    <h2>Transfer</h2>
    <div class="row">
      <div class="label">From</div>
      <input type="text" v-if="currentAcc" v-model="currentAcc.address" disabled />
    </div>
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
import { Account, AccountInfo } from '@/models'
import { Vue } from 'vue-class-component'
import { Getter, Action } from 'vuex-class'
import { container, cid } from 'inversify-props'
import { ITransactionService } from '@/services'

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
    width: 480px;
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
