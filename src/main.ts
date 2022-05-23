import { createApp } from 'vue'
import buildDependencyContainer from './app.container'
import App from './App.vue'
import store from './store'

class AppBootstrap {
  constructor () {
    buildDependencyContainer()
    createApp(App)
      .use(store)
      .mount('#app')
  }
}

// eslint-disable-next-line no-new
new AppBootstrap()
