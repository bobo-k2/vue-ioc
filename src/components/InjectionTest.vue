<template>
  <div>a</div>
</template>

<script lang="ts">
import Component from 'vue-property-decorator'

import { inject } from 'inversify-props'
import IAccountRepository from '../repositories/IAccountRepository'

@Component
export default class InjectionTest extends Vue {
  @inject() private accountRepo!: IAccountRepository

  protected async mounted (): Promise<void> {
    const res = await this.accountRepo.getAccount('XLoLJBQoMPHMLXYhdFobSpH5GujRoUH8d1sUtaEtoBG7zaS')

    console.log(res.toHuman())
  }
}
</script>
