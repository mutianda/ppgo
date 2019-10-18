import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import shopCart from './modules/shop/cart'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    shopCart
  },
  getters
})
export default store
