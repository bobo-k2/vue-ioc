<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld/>
</template>

<script lang="ts">
import '@polkadot/api-augment'
import { defineComponent, provide } from 'vue'
// import serviceContainer from './service-container'
import HelloWorld from './components/HelloWorld.vue'
import { TokenApiKey } from './repositories/symbols'
import { TokenApi } from './repositories/token-api'
import IApi from './integration/IApi'
import Api from './integration/implementation/Api'
import IAccountRepository from './repositories/IAccountRepository'
import AccountRepository from './repositories/implementation/AccountRepository'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup () {
    provide(TokenApiKey, new TokenApi())

    // TODO for test purposes only, remove later
    const api: IApi = new Api('wss://rpc.shiden.astar.network')
    const accountRepo: IAccountRepository = new AccountRepository(api)

    const fetch = async (): Promise<void> => {
      const account = await accountRepo.getAccount('XLoLJBQoMPHMLXYhdFobSpH5GujRoUH8d1sUtaEtoBG7zaS')
      console.log(account.toHuman())

      const account1 = await accountRepo.getAccount('XLoLJBQoMPHMLXYhdFobSpH5GujRoUH8d1sUtaEtoBG7zaS')
      console.log(account1.toHuman())
    }

    fetch()
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
