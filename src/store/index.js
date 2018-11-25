// 导入Vuex
import Vuex from 'vuex'
// 导入Vue
import Vue from 'vue'
//导入mutations,getters
import mutations from './mutations'
import getters from './getters'

// 注册vuex到vue中
Vue.use(Vuex)

// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
let car = JSON.parse(localStorage.getItem('car') || '[]')


//state 类似 组件中的data, 专门用来储存数据的,如果在组件中想要访问 store中的数据, 只能通过this.$store.state.数据名 来访问
const state = {


    car: car //将购物车中的商品的数据,用一个数组存储起来, 在car数组中,存储一些商品的对象, 可以暂时将这个商品对象,设计成这个样子 {id: 商品的id, count: 要购买的数量, selected: false}
}

//new Vuex.Store() 实例, 得到一个数据仓对象
export default new Vuex.Store({
    state,
    mutations,
    getters
    
})
