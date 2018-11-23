// 入口文件
import Vue from 'vue'
import App from './App'
import router from './router/'
//导入moment 时间处理
import moment  from 'moment'

//导入vue-resource 与后台交互
import VueResource from 'vue-resource'
// 注册
Vue.use(VueResource)
//配置vue-resource 的请求根域名
Vue.http.options.root = 'http://www.lovegf.cn:8899/'

Vue.config.productionTip = false

// 按需导入需要的mint-ui组件
import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
//引入mint-ui的样式(疑似样式包有问题)
// import 'mint-ui/lib/style.css'
// 注册组件
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload)

//导入公共样式
import './css/common.less'

//定义全局过滤器
Vue.filter('dateFormat', function(dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  //直接调用表示获取当前时间
  return moment(dateStr).format(pattern)
})



//导入mui的样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'



new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
