<template>
    <div class="newsList-container">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media">
                <router-link :to="'/home/newsInfo/' + item.id" v-for="(item) in newsList" :key="item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h4 class="mui-ellipsis"> {{item.title}} </h4>
                        <p class='mui-ellipsis'>
                            <span>发表时间:{{item.add_time | dateFormat}}</span>
                            <span>点击: {{item.click}} 次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            newsList: []
        }
    },
    created() {
        this.getNewsList()
    },
    methods: {
        getNewsList() {
            this.$http.get('api/getnewslist').then( result => {
                // console.log(result)
                if(result.body.status === 0) {
                    this.newsList = result.body.message
                } else {
                    Toast('新闻列表查询失败,请重试!')
                }
            })
        }
    }
};
</script>

<style>
</style>
