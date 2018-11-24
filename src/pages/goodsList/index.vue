<template>
    <div class="goodsList-container">
        <div class="good-item" v-for="(item) in goodsList" :key="item.id">
            <img :src=" item.img_url " alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span>¥{{item.sell_price}}</span>
                    <span>¥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'

export default {
    data() {
        return {
            pageindex: 1,
            goodsList: []
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList() {
            this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result => {
                console.log(result)
                if(result.body.status === 0) {
                    this.goodsList = result.body.message
                } else {
                    Toast('获取商品详情失败,请重试!')
                }
            })
        }
    }
}
</script>

<style lang="less">

.goodsList-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 7px;
    .good-item {
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img {
            width: 100%;
        }
        .title {
            font-size: 14px;
            font-weight: bold;
        }
        .info {
            background-color: #eee;
            p {
                margin: 0;
                padding: 5px;
            }
            .price {
                span:first-child {
                    color: red;
                    font-size: 16px;
                    font-weight: bold;
                }
                span:last-child {
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell {
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
    }
}
</style>
