<template>
    <div class="goodsInfo-container">
        
        <div class="mui-card">
                <!-- 商品轮播图 -->
				<div class="mui-card-content">
					<div class="mui-card-content-inner">						
                        <swiper :bannerList="swiperList" :isfull="false"></swiper>
					</div>
				</div>
			</div>
            <!-- 商品购买区域 -->
			<div class="mui-card">
				<div class="mui-card-header">商品名称</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价：<del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;
                            销售价：<span class="now_price">￥{{goodsInfo.sell_price}}</span>
                        </p>
                        <div class="buy">
                            购买数量：
                            <p>
                                <input type="button" value="-" @click="getBuySub">
                                <input type="number" v-model="buyNum">
                                <input type="button" value="+" @click="getBuyAdd">

                            </p>
                            
                        </div>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        </p>
					</div>
				</div>
			</div>
			<!-- 商品参数区域 -->
			<div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsInfo.goods_no}} </p>
                        <p>库存情况：{{goodsInfo.stock_quantity}} 件</p>
                        <p>上架时间：{{goodsInfo.add_time | dateFormat }} </p>
					</div>
				</div>
				<div class="mui-card-footer">
					<mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
				</div>
			</div>
            <!-- 半场动画小球 -->
            <transition
                name="my-ball"
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
                <div class="ball" v-show="ballFlag" ref="ball"></div>
            </transition>
            
    </div>
</template>

<script>
import swiper from "../../components/swiper/";
export default {
  data() {
    return {
      id: this.$route.params.id,
      swiperList: [], //轮播图的数据
      buyNum: 1, //保证用户选择的数量,默认1个
      goodsInfo: {}, //获取到的商品信息
      ballFlag: false //控制小球的隐藏和显示的标识符
    };
  },
  created() {
    this.getSwiperList(), this.getGoodsInfo();
  },
  methods: {
    //获取轮播图
    getSwiperList() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img， 不认识 item.src
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.swiperList = result.body.message;
        }
      });
    },
    // 增加购买数量
    getBuyAdd() {
      if (this.buyNum < this.goodsInfo.stock_quantity) {
        this.buyNum++;
      }
    },
    // 减少购买数量
    getBuySub() {
      if (this.buyNum > 1) {
        this.buyNum--;
      }
    },
    // 获取商品参数及价格
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        console.log(result);
        if (result.body.status === 0) {
          this.goodsInfo = result.body.message[0];
        }
      });
    },
    addToShopCar() {
      // 添加到购物车
      this.ballFlag = !this.ballFlag;

      // 拼接出一个,要保存到store 中的 car 数组里的商品 信息对象
      let carInfo = {
        id: this.id,
        count: this.buyNum,
        selected: true
      }
      // 调用 store 中的 mutations 来讲商品加入购物车
      this.$store.commit("addToCar", carInfo)
    },
    // 图文介绍
    goDesc(id) {
      this.$router.push({ name: "goodsDesc", params: id });
    },
    // 商品评论
    goComment(id) {
      this.$router.push({ name: "goodsComment", params: id });
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    //   console.log("beforeEnter");
    },
    enter(el, done) {
      el.offsetWidth;
    //   console.log("enter");
      //小球动画优化思路:
      // 1.先分析导致 动画不准确的本质原因: 我们把小球最终位移到的位置, 已经局限在了某一分辨率下的滚动条未滚动的情况下;
      // 2.只要分辨率和测试的时候不一样,或者滚动条有一定的滚动距离后,问题就出现了,因此我妈妈不能把位置的横纵坐标写死了,而是应该根据不同的情况,动态的计算这个坐标值
      // 3.思路: 先得到徽标的横纵坐标,在得到小球的横纵坐标,然后让Y值求差,X值月求差,得到的结果,就是横纵坐标要位移的距离
      // 4. 通过 domObject.getBoundingClientRect()  获取位置坐标

      //获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      console.log(this.$refs.ball)
      //获取徽标在页面中的位置,这里需要操作dom
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.4s cubic-bezier(.4,-0.3,1,.68)";

      done();
    },
    afterEnter(el) {
    //   console.log("afterEnter");

      this.ballFlag = !this.ballFlag
    }
  },
  components: {
    swiper
  },
  watch: {
      buyNum: function(to, from) {
          if(to > this.goodsInfo.stock_quantity) {
              this.buyNum = this.goodsInfo.stock_quantity
          } else if (to === "") {
              this.buyNum = 1
          }
      }
  }
};
</script>

<style lang="less">
.goodsInfo-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .buy {
    p {
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
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }

  
    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 390px;
        left: 146px;
    }
}
</style>
