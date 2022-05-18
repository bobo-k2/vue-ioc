<template>
  <div class="hello">
    {{ result }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TokenApiKey, injectStrict } from '../repositories/symbols'

export default defineComponent({
  setup () {
    const api = injectStrict(TokenApiKey)
    const result = ref<number>(0)

    const getData = (): number => {
      return api.getTvl()
    }

    result.value = getData()

    return {
      result
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
