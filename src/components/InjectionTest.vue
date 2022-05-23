<template>
  <div>
    <h2>Account balance is</h2>
    <div>{{ account.balance }}</div>
  </div>
</template>

<script lang="ts">
import AccountInfo from '@/models/AccountInfo'
import { Vue } from 'vue-class-component'
import { Action, Getter } from 'vuex-class'

export default class InjectionTest extends Vue {
  @Getter
  private account!: AccountInfo

  @Action
  private getAccountInfo!: () => Promise<void>

  async mounted (): Promise<void> {
    await this.getAccountInfo()
  }
}
</script>
