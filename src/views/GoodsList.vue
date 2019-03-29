<template xmlns:v-lazy="http://www.w3.org/1999/xhtml">
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>购物车</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">
            Price
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}"
                     @click="setPriceFilter('all')">All</a></dd>
              <dd v-for="(price,index) in priceFilter">
                <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>

            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsLists">
                  <div class="pic">
                    <a href="#"><img v-bind:src="'../static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{(item.salePrice) | currency('¥')}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                <img style="position: relative;left: 50%;transform: translateX(-50%)" v-show="loading"
                     src="../../static/loading-svg/loading-bars.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">
        请先登录，否则无法进行！
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" @click="closeModal" href="javascript:;">关闭</a>
      </div>
    </modal>

    <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
      <p slot="message">
        <svg class="navbar-cart-ok" style="width: 30px;">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart" >添加购物车成功！</use>
        </svg>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" @click="mdShowCart=false" href="javascript:;">继续购物</a>
        <router-link  class="btn btn--m" href="javascript:;" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import NavHeader from '@/components/Header.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import NavBread from '@/components/NavBread.vue'
  import Modal from './../components/Modal'
  import axios from 'axios'
  export default{
    data(){
      return {
        goodsLists: [],
        priceFilter: [
          {
            startPrice: '0.00',
            endPrice: '100.00'
          },
          {
            startPrice: '100.00',
            endPrice: '500.00'
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00'
          },
          {
            startPrice: '1000.00',
            endPrice: '5000.00'
          }
        ],
        priceChecked: 'all',
        sortFlag: true,
        pageSize: 8,
        page: 1,
        busy: false,
        loading: false,
        mdShow:false,
        mdShowCart:false
      }
    },

    components: {
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    },
    mounted: function () {
      this.getGoodsList();
    },
    methods: {
      getGoodsList(flags){
        let param = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag ? 1 : -1,
          priceLevel: this.priceChecked
        };
        this.loading = true;
        axios.get("/goods/list", {params: param}).then((result) => {
          var res = result.data;
          this.loading = false;
          if (res.status == "0") {
            if (flags) {
              this.goodsLists = this.goodsLists.concat(res.result.list);
              if (res.result.count == 0) {
                this.budy = true;
              } else {
                this.budy = false;
              }
            } else {
              this.budy = false;
              this.goodsLists = res.result.list;
            }

          } else {
            this.goodsLists = [];
          }

        });
      },
      sortGoods(){
        this.sortFlag = !this.sortFlag;
        this.page = 1;
        this.getGoodsList();
      },
      setPriceFilter(index){
        this.priceChecked = index;
        console.log(this.priceChecked);
        this.page = 1;
        this.getGoodsList();
      },
      loadMore: function () {
        this.budy = true;
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true);
          console.log(this.budy)
        }, 500)
      },
      addCart(productIds){
        axios.post("/goods/addCart", {
          productId: productIds
        }).then((response) => {
          let res = response.data;
          if (res.status == '0') {
            this.mdShowCart = true;
          } else {
           this.mdShow = true;
          }
        });
      },
      closeModal(){
          this.mdShow = false;
      }
    }
  }
</script>


