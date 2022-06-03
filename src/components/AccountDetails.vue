<template>
  <div>
    <h2>Current account balance</h2>
    <div>{{ currentAcc?.address }}</div>
    <div>{{ account?.balance }}</div>
    <div><h3>{{ account?.balanceFormatted }}</h3></div>
  </div>
</template>

<script lang="ts">
import { Account, AccountInfo } from '@/models'
import { Vue } from 'vue-class-component'
import { Getter } from 'vuex-class'

export default class AccountDetails extends Vue {
  @Getter
  private currentAcc!: Account

  @Getter
  private account!: AccountInfo
}
</script>
