// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/currency'

Vue.config.productionTip = false;

Vue.filter("currency",currency);
Vue.use(infiniteScroll);
Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    nickName:'',
    cartCount:0
  },
  mutations:{
    updateUserInfo(state,nickName){
      state.nickName = nickName;
    },
    updatecartCount(state,cartCount){
      state.cartCount=cartCount;
    }
  }
})

// Vue.use(VueLazyLoad,{
//   loading:"/static/loading-svg/loading-bars.svg"
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
