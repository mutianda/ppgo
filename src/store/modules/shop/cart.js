
const cart = {
  state: {
    cart: {
    }
  },
  mutations: {
    ADD_CART: (state, {shopId, typeId, product}) => {
      if (state.cart[shopId] && state.cart[shopId][typeId] && state.cart[shopId][typeId][product.productId]) {
        state.cart[shopId][typeId][product.productId].count++
      } else {
        product.count = 1
        if (!state.cart[shopId]) state.cart[shopId] = {}
        if (!state.cart[shopId][typeId]) state.cart[shopId][typeId] = {}
        if (!state.cart[shopId][typeId][product.productId]) state.cart[shopId][typeId][product.productId] = {}
        state.cart[shopId][typeId][product.productId] = product
      }
      state.cart = Object.assign({}, state.cart)
      // state.cart = JSON.parse(JSON.stringify(state.cart))
    },
    DESCEASE_CART: (state, {shopId, typeId, product}) => {
      let a = state.cart[shopId][typeId][product.productId]
      if (a && a.count > 0) {
        state.cart[shopId][typeId][product.productId].count--
        if (a.count === 0) {
          state.cart[shopId][typeId][product.productId] = null
        }
      } else {
        state.cart[shopId][typeId][product.productId] = null
      }
      // state.cart = JSON.parse(JSON.stringify(state.cart))
      state.cart = Object.assign({}, state.cart)
    }
  },
  actions: {
    addProductToCart ({ commit }, cart) {
      commit('ADD_CART', cart)
    },
    descreaseProductToCart ({ commit }, cart) {
      commit('DESCEASE_CART', cart)
    }
  }
}

export default cart
