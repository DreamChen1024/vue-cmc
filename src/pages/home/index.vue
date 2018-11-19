<template>
    <div class="home-container">
        <mt-swipe class="banner-contarner" :auto="4000">
            <mt-swipe-item v-for="(item, index) in bannerList" :key="index">
                <a :href="item.url">
                    <img :src="item.img" alt="">
                </a>
            </mt-swipe-item>
            
        </mt-swipe>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
    data () {
        return {
            bannerList: []
        }
    },
    created() {
        this.getBannerData()
    },
    methods: {
        getBannerData() {
            this.$http.get('http://www.lovegf.cn:8899/api/getlunbo').then( result => {
                if(result.body.status === 0) {
                    this.bannerList = result.body.message
                } else {
                    Toast('轮播图加载失败,请重试!')
                }
            })
        }
    }

};
</script>

<style lang="less">
    .home-container {
        .banner-contarner {
            width: 100%;
            height: 200px;
            a {
                display: block;
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                }
            }
        }
    }

</style>


