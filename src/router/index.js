import Vue from 'vue'
import Router from 'vue-router'

import homeComponent from '../pages/home/'
import meberComponent from '../pages/member/'
import shopcarComponent from '../pages/shopcar/'
import searchComponent from '../pages/search/'
import newsList from '../pages/newsList/'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home'},
    { path: '/home', component: homeComponent},
    { path: '/member', component: meberComponent},
    { path: '/shopcar', component: shopcarComponent},
    { path: '/search', component: searchComponent},
    { path: '/home/newsList', component:newsList}
  ],
  linkActiveClass: 'mui-active'
})
