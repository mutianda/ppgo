const getters = {
  shopCart: state => state.shopCart.cart,
  user: state => state.user.user,
  orderList: state => state.shopCart.order
}
export default getters
