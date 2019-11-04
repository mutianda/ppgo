const getters = {
  shopCart: state => state.shopCart.cart,
  user: state => state.user.user,
  orderList: state => state.shopCart.order
}
console.log(getters,'getter')
export default getters
