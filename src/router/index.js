import Vue from 'vue'
import Router from 'vue-router'

import homeComponent from '../pages/home/'
import meberComponent from '../pages/member/'
import shopcarComponent from '../pages/shopcar/'
import searchComponent from '../pages/search/'
import newsListComponent from '../pages/newsList/'
import newsInfoComponent from '../pages/newsInfo/'
import photosListComponent from '../pages/photos/'
import photosInfoComponent from '../pages/photosInfo/'
import goodsListComponent from '../pages/goodsList/'


Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home'},
    { path: '/home', component: homeComponent},
    { path: '/member', component: meberComponent},
    { path: '/shopcar', component: shopcarComponent},
    { path: '/search', component: searchComponent},
    { path: '/home/newsList', component: newsListComponent},
    { path: '/home/newsInfo/:id', component: newsInfoComponent},
    { path: '/home/photos', component: photosListComponent},
    { path: '/home/photosInfo/:id', component: photosInfoComponent},
    { path: '/home/goodsList', component: goodsListComponent}
  ],
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})
