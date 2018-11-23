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
    { path: '/home/photosInfo/:id', component:photosInfoComponent}
  ],
  linkActiveClass: 'mui-active'
})
