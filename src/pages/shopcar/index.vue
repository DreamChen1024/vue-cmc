<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch></mt-switch>
            <img src>
            <div class="info">
              <h1>华为（HUAWEI）荣耀6Plus 16G双4G版</h1>
              <div>
                <span class="price">￥2999</span>
                <p class="calculation">
                  <input type="button" value="-" @click="getBuySub">
                  <input type="number" v-model="buyNum">
                  <input type="button" value="+" @click="getBuyAdd">
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
                <span class="red">1</span> 件， 总价
                <span class="red">￥2999</span>
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
      buyNum: 1
    };
  },
  methods: {
    // 增加购买数量
    getBuyAdd() {
      // if (this.buyNum < this.goodsInfo.stock_quantity) {
      //     this.buyNum++;
      // }
    },
    // 减少购买数量
    getBuySub() {
      if (this.buyNum > 1) {
        this.buyNum--;
      }
    }
  }
};
</script>

<style lang="less">
.shopcar-container {
  .mui-card-content-inner {
    display: flex;
    justify-content: space-between;
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



