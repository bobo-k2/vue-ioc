<template>
  <div>
    <h2>Accounts</h2>
    <div v-for="(account, index) in accounts" :key="index">
      {{account.name}} [{{ account.address }}]
    </div>
  </div>
</template>

<script lang="ts">
import Account from '@/models/Account'
import { Vue } from 'vue-class-component'
import { Getter } from 'vuex-class'

export default class Accounts extends Vue {
  @Getter
  private accounts!: Account[]
}
</script>
