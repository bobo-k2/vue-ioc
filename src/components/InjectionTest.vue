<template>
  <div>a</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

import { inject } from 'inversify-props'
import IAccountRepository from '../repositories/IAccountRepository'

export default class InjectionTest extends Vue {
  @inject() private accountRepository!: IAccountRepository

  async mounted (): Promise<void> {
    const res = await this.accountRepository.getAccount('XLoLJBQoMPHMLXYhdFobSpH5GujRoUH8d1sUtaEtoBG7zaS')

    console.log(res.toHuman())
  }
}
</script>
