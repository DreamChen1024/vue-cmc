<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item, i) in shopCarList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch 
            v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{item.title}}</h1>
              <div>
                <span class="price">￥{{item.sell_price}}</span>
                <p class="calculation">
                  <input type="button" value="-" @click="getBuySub(item.id)">
                  <input type="number" :value="$store.getters.getGoodsCount[item.id]">
                  <input type="button" value="+" @click="getBuyAdd(item.id)">
                </p>
                <!-- 问题：如何从购物车中获取商品的数量呢 -->
                <!-- 1. 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据， 把 当前循环这条商品的 Id， 作为 对象 的 属性名，count值作为 对象的 属性值，这样，当把所有的商品循环一遍，就会得到一个对象： { 88: 2, 89: 1, 90: 4 } -->
                <a href="#">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner Settlement">
            <div class="left">
              <p>总计（不含运费）</p>
              <p>已勾选商品
                <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件， 总价
                <span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span>
              </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopCarList: []
    }
  },
  created() {
      this.getShopCarList()
  },
  methods: {
    // 增加购买数量
    getBuyAdd(id) {
        //调用store中的  mutations 方法 让count值 ++
        this.$store.commit("buyAdd",id)
      
    },
    // 减少购买数量
    getBuySub(id) {
      this.$store.commit("buySub",id)
    },
    getShopCarList() {
        // 1.获取到 store 中所有的商品的id, 然后拼接出一个 用逗号分隔的 字符串
        let idArr = [];
        this.$store.state.car.forEach(item => idArr.push(item.id));
        // 如果购物车中没有商品, 则直接返回, 不需要请求数据接口,否则会报错
        if (idArr.length <= 0) {
            return;
        }
        //获取购物车商品列表
        this.$http.get('api/goods/getshopcarlist/' + idArr.join(','))
        .then(result => {
            if (result.body.status === 0) {
                // console.log(result)
                this.shopCarList = result.body.message;
            }
        })
    }
  }
};
</script>

<style lang="less">
.shopcar-container {
    background-color: #eee;
    overflow: hidden;
  .mui-card-content-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
        width: 60px;
    }
    .info {
        h1 {
            font-size: 13px;
            font-weight: bold;
        }
        .price {
            color: red;
            font-weight: bold;
            
        }
    }
  }
  .calculation {
    display: inline-block;
    width: 120px;
    height: 35px;
    vertical-align: middle;
    border: 1px solid #bbb;
    position: relative;
    overflow: hidden;
    border-radius: 3px;

    input[type="button"] {
      width: 40px;
      height: 33px;
      font-size: 16px;
      background-color: #eee;
      float: left;
      border: none;
    }

    input[type="number"] {
      width: 38px;
      height: 34px;
      float: left;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      border-radius: 0;
      border-top: none;
      border-bottom: none;
      padding: 0 3px;
      text-align: center;
    }
  }
  .Settlement {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>



