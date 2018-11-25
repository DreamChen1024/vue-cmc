<template>
        <!-- 轮播图 -->
        <mt-swipe class="banner-contarner" :auto="4000">
            <mt-swipe-item v-for="(item, index) in bannerList" :key="index">
                <a :href="item.url">
                    <img :src="item.img" alt="" :class="{'full': isfull}">
                </a>
            </mt-swipe-item>
        </mt-swipe>

</template>

<script>
export default {
    props: ['bannerList','isfull']
}
</script>

<style lang="less">
    .banner-contarner {
        width: 100%;
        height: 200px;
        a {
        display: block;
        width: 100%;
        height: 100%;
        img.full {
            width: 100%;
        }
        }
    }
</style>
