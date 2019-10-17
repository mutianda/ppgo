
const cart = {
  state: {
    cart: {}
  },
  mutations: {
    ADD_CART: (state, {shopId, productId}) => {
      state.cart[shopId][productId]++
    },
    DESCEASE_CART: (state, {shopId, productId}) => {
      state.cart[shopId][productId].count--
    }
  },
  actions: {
    addCartCount ({ commit }, cart) {
      commit('ADD_CART', cart)
    },
    descreaseCartCount ({ commit }, cart) {
      commit('DESCEASE_CART', cart)
    }
  }
}

export default cart
