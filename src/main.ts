import { createApp } from 'vue'
import buildDependencyContainer from './app.container'
import App from './App.vue'

class AppBootstrap {
  constructor () {
    buildDependencyContainer()
    createApp(App).mount('#app')
  }
}

// eslint-disable-next-line no-new
new AppBootstrap()
