import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from './../views/GoodsList'
import Cart from './../views/Cart.vue'
import Address from './../views/Address.vue'
import OrderConfirm from './../views/OrderConfirm'
import OrderSuccess from './../views/OrderSuccess'

Vue.use(Router);
r
export default new Router({
  mode:"history",
  routes: [
    {
      path: '/' ,
      name: 'GoodsList',
      component: GoodsList,
    },{
      path:'/cart',
      name:'Cart',
      component:Cart
    },{
      path:'/address',
      name:'Address',
      component:Address
    },{
      path:'/orderConfirm',
      name:'OrderConfirm',
      component:OrderConfirm
    },{
      path:'/orderSuccess',
      name:'OrderSuccess',
      component:OrderSuccess
    }
  ]
})
