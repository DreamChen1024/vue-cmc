<template>
    <div class="comment-container">
        <h2>发表评论</h2>
        <hr>
        <textarea placeholder="请输入您要评论的内容,最多输入120字!" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <div class="comment-list">
            <div class="comment-item" v-for="(item, index) in commentList" :key="index">
                <div class="comment-title">
                    <span>第 {{index + 1}} 楼</span> &nbsp;&nbsp;
                    <span>用户:{{ item.user_name }}</span>&nbsp;&nbsp;
                    <span>发表时间:{{ item.add_time | dateFormat }}</span>

                </div>
                <div class="comment-content"> {{item.content}} </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain>加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'

export default {
    props: ['id'],
    data() {
        return {
            pageIndex: 1,
            commentList: []
        }
    },
    created() {
        this.getComments()
    },
    methods: {
        getComments() {
            this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
            .then(result => {
                // console.log(result)
                if(result.body.status === 0) {
                    this.commentList = result.body.message
                } else {
                    Toast('加载失败,请重试!')
                }
            })
        }
    }
};
</script>

<style lang="less">

    .comment-container {
        .comment-list {
            .comment-item {
                margin: 5px 0;
                .comment-title {
                    font-size: 13px;
                    background-color: #ccc;
                }
                .comment-conent {
                    font-size: 13px;
                }
            }
        }
    }
</style>
