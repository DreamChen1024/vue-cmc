<template>
    <div class="photosInfo-container">
        <div class="title"> {{photosInfo.title}} </div>
        <div class="subtitle">
            <span class="ctime">发表时间: {{photosInfo.add_time | dateFormat}} </span>
            <span class="click">点击: {{photosInfo.click}} 次</span>
        </div>
        <hr>
        <!-- 缩略图 -->
        <img class="preview-img" v-for="(item, index) in list" :key="index" :src="item.src" height="100" @click="$preview.open(index, list)">
        <!-- 内容 -->
        <div class="content" v-html="photosInfo.content"></div>
        <!-- 评论 -->
        <comment :id="id"></comment>
    </div>
</template>

<script>
import comment from '../../components/comment/'
export default {
    data() {
        return {
            id: this.$route.params.id,
            photosInfo: [], //图文详情
            list: [] //缩略图
        }
    },
    created() {
        this.getPhotosInfo(),
        this.getThumImages()
    },
    methods: {
        //获取图片详情
        getPhotosInfo() {
            this.$http.get('api/getimageInfo/' + this.id).then( result => {
                // console.log(result)
                if(result.body.status === 0) {
                    this.photosInfo = result.body.message[0]
                }
            })
        },
        //获取缩略图
        getThumImages() {
            this.$http.get('api/getthumimages/' + this.id).then(result => {
                console.log(result)
                if(result.body.status === 0) {
                    result.body.message.forEach(item => {
                        item.w = 600
                        item.h = 400
                    })
                    this.list = result.body.message
                }
            })
        }
    },
    components: {
        comment
    }
}
</script>

<style lang="less">
    .photosInfo-container {
        padding: 3px;
        .title {
            text-align: center;
            font-size: 15px;
            font-weight: bold;
            color: #26a2ff;
            margin: 15px 0;
        }
        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            color: #8f8f94;
            padding: 0 5px;
        }
        .content {
            font-size: 13px;
            line-height: 30px;
        }
        .thumbs{
            img{
            margin: 10px;
            box-shadow: 0 0 8px #999;
            }
        }
    }
</style>
