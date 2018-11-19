// 入口文件
import Vue from 'vue'
import App from './App'
import router from './router/'

//导入vue-resource 与后台交互
import VueResource from 'vue-resource'
// 注册
Vue.use(VueResource)

Vue.config.productionTip = false

// 按需导入需要的mint-ui组件
import { Header, Swipe, SwipeItem } from 'mint-ui'
//引入mint-ui的样式(疑似样式包有问题)
import 'mint-ui/lib/style.css'
// 注册组件
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

//导入mui的样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
