<template>
  <div class="app-container">
    <!-- 头部区域 -->
    <mt-header fixed title="Vue-cmc">
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <!-- 底部区域 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="my-mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="my-mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="my-mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="my-mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

    <!-- 中间内容区域 -->
    <transition>
      <router-view></router-view>
    </transition>
    
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      flag: false
    }
  },
  created() {
    this.flag = this.$route.path === "/home" ? false : true;
  },
  methods: {
    goBack() {
      // 点击后退
      this.$router.go(-1)
    }
  },
  watch: {
    "$route.path": function(newVal) {
      if(newVal === "/home") {
        this.flag = false
      } else {
        this.flag = true
      }
    }
  }
}
</script>

<style lang="less">
  .app-container {
    padding-top: 40px;
    padding-bottom: 50px;
    background-color: #fff;
    overflow-x: hidden; // 避免动画进行时 出现滚动条

    .mui-bar-tab .my-mui-tab-item.mui-active {
      color: #007aff;
    }
    .mui-bar-tab .my-mui-tab-item {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
    }
    .mui-bar-tab .my-mui-tab-item .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
    }
    .mui-bar-tab .my-mui-tab-item .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    }
  }

  .v-enter {
    transform: translateX(100%);
    opacity: 0;
  }
  .v-leave-to {
    transform: translateX(-100%);
    opacity: 0;
    position: absolute;
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }
</style>
