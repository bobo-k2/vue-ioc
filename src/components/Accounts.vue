<template>
  <div>
    <h2>Accounts</h2>
    <div v-for="(account, index) in accounts" :key="index">
      <b>{{ account.address }}</b><span v-if="account.name"> - {{account.name}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Account } from '@/models'
import { Vue } from 'vue-class-component'
import { Getter } from 'vuex-class'

export default class Accounts extends Vue {
  @Getter
  private accounts!: Account[]
}
</script>
