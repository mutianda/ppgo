
const user = {
  state: {
    user: {}
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
      // state.cart = JSON.parse(JSON.stringify(state.cart))
    }
  },
  actions: {
    setUserInfo ({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('SET_USER', user)
        localStorage.setItem('user', JSON.stringify(user))
        const res = {code: 0}
        resolve(res)
      })
    }
  }
}

export default user
