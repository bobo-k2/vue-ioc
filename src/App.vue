<template>
  <div>
    <InjectionTest />
  </div>
</template>

<script lang="ts">
import '@polkadot/api-augment'
import { defineComponent, provide } from 'vue'
// import serviceContainer from './service-container'
import InjectionTest from './components/InjectionTest.vue'
import { TokenApiKey } from './repositories/symbols'
import { TokenApi } from './repositories/token-api'

export default defineComponent({
  name: 'App',
  components: {
    InjectionTest
  },
  setup () {
    provide(TokenApiKey, new TokenApi())
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
