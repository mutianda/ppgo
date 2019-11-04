import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import shopCart from './modules/shop/cart'
import user from './modules/user/userInfo'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    shopCart,
    user
  },
  getters
})
export default store
