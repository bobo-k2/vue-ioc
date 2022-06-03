import Vuex from 'vuex'

// Modules
import General from './modules/General'
import Xcm from './modules/Xcm'

export default new Vuex.Store({
  modules: {
    General,
    Xcm
  }
})
