<template>
    <div class="photosList-container">
        <!-- 顶部滑动导航 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="{'mui-control-item': true,'mui-active' : item.id == 0}" v-for="(item, index) in categoryList" :key="index">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
        <!-- 图片列表 -->
        <div class="imgList">
            <router-link to="" v-for="item in list" :key="item.id" tag="li">
                        <img v-lazy="item.img_url" >
                        <div class="info">
                            <h1 class="info-title">{{item.title}}</h1>
                            <div class="info-body"> {{item.zhaiyao}} </div>
                        </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
import {Toast} from 'mint-ui'

export default {
  data() {
    return {
      categoryList: [],
      list: []
    };
  },
  created() {
    this.getImgCategory();
    this.getImagesList(0)
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
      //获取图片列表分类
    getImgCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        // console.log(result)
        if (result.body.status === 0) {
          this.categoryList = result.body.message;
          this.categoryList.unshift({ id: 0, title: "全部" });
        }
      });
    },
    //根据ID 获取图片列表
    getImagesList(id) {
        this.$http.get('api/getimages/' + id).then(result => {
            // console.log(result)
            if(result.body.status === 0) {
                this.list = result.body.message
            } else {
                Toast('图片加载失败,请重试!')
            }
        })
    }
  }
};
</script>

<style lang="less">
.photosList-container {
    touch-action: pan-y; //mui 清除chrome控制台警告提示
    .mui-slider {
        z-index: 0;
    }
    .imgList {
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0;
        li {
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;
            img {
                width: 100%;
                vertical-align: middle;
            }
            image[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }   
            image[lazy=error] {
                width: 40px;
                height: 300px;
                margin: auto;
            } 
            .info {
                color: white;
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.4);
                max-height: 84px;
                .info-title {
                    font-size: 14px;
                }
                .info-body {
                    font-size: 13px;
                }
            }
        }
        
        
    }
}
</style>
