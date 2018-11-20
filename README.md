# vue-cmc

> 这是一个学习的项目         

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
## 搭建 Vue 项目
由于webpack配置比较繁琐, 而且没有逻辑性可言, 对于开发人员来讲不太友好, 很多开发者希望能有现成的模板

当然, 早期网络上有很多现成的代码可以拷贝, 但是由于webpack不断再更新, 周边的插件或loader之类的东西也在不断地更新, 对于前端工程师来讲就需要不断的学习, 投入大量的精力在环境上

所以, vue官方提供了脚手架, 帮助我们快速部署基于webpack的vue开发环境

脚手架名为: vue-cli

用法:

1. 装包

	全局安装脚手架工具

		npm install vue-cli -g

2. 使用脚手架创建模板

	创建完整版的webpack配置(困难)

		vue init webpack 项目名称

	创建简单版的webpack配置(简单,适合初学者)

		vue init webpack-simple 项目名称

3. 如果是用的是第一种模板, 会自动运行npm install, 第二种简单模板需要手动运行npm install, 然后使用npm run dev打开项目

这里我使用的完整版的webpack配置, 脚手架搭好后我们开始写项目.
##首页
    这里用到的是`mint-ui` 和 `mui` 库
    1.首先引入 `mint-ui` 库(你可以引入整个 Mint UI，或是根据需要仅引入部分组件。注:我是按需引入)
        完整引入
        在 main.js 中写入以下内容：

        import Vue from 'vue'
        import MintUI from 'mint-ui'
        import 'mint-ui/lib/style.css'
        import App from './App.vue'

        Vue.use(MintUI)

        new Vue({
        el: '#app',
        components: { App }
        })
        以上代码便完成了 Mint UI 的引入。需要注意的是，样式文件需要单独引入。

        按需引入
        借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。

        首先，安装 babel-plugin-component：

        npm install babel-plugin-component -D
        然后，将 .babelrc 修改为：

        {
        "presets": [
            ["es2015", { "modules": false }]
        ],
        "plugins": [["component", [
            {
            "libraryName": "mint-ui",
            "style": true
            }
        ]]]
        }
    
    2.头部Header
        引入
        import { Header } from 'mint-ui';

        Vue.component(Header.name, Header);
        例子
        固定在页面顶部

        <mt-header fixed title="固定在顶部"></mt-header>

    3.底部Footer(这里用的是`mui`库)
        因npm里没有 `mui` 包, 需要在官网自行下载,在src目录中创建lib文件,把mui包丢进去
        3.1 在`mui`中找到tabBar组件
        3.2 找到`mui`的扩展图标库
        3.3 将扩展图标库拷贝到项目中(连带字体文件一起拷贝)
        3.4 在main.js中引入字体图标的样式文件
        3.5 使用字体图标
        3.6 设置当前选中的tab栏高亮
            结合路由的linkActiveClass属性完成使用mui-active类样式的高亮
            配置路由规则实现路由跳转
            项目文件的结构注意事项, 可以参考现有的开源项目, 更方便的管理自己的文件结构

            参考结构:

            src => pages => home => index.vue

            配置路由规则:

            import HomeComponent from '../pages/home/'
            import MemberComponent from '../pages/member/'
            import ShopcarComponent from '../pages/shopcar/'
            import SearchComponent from '../pages/search/'

            Vue.use(Router)

            export default new Router({
            routes: [
                { path: '/', redirect: '/home' },
                { path: '/home', component: HomeComponent },
                { path: '/member', component: MemberComponent },
                { path: '/shopcar', component: ShopcarComponent },
                { path: '/search', component: SearchComponent },
            ],
            linkActiveClass: 'mui-active'
            })

    4.制作首页轮播图
        4.1 通过mint-ui的swipe组件完成样式
        4.2 使用vue-resource获取接口中的数据, 进行渲染
    5.首页九宫格的样式改造
        5.1 由于mint-ui没有合适的组件可供参考, 所以我们使用mui的(grid)代码片段作为改造的基础模板
        5.2 修改结构并覆盖mui的默认样式
        5.3 抽取全局的common.less样式, 通过main.js引入
    6.添加组件切换动画
        切换动画的起点和终点不同, 所以单独设置v-enter和v-leave-to的样式
        .v-enter {
        transform: translateX(100%);
        opacity: 0;
        }

        .v-leave-to {
        position: absolute;
        transform: translateX(-100%);
        opacity: 0;
        }

        .v-enter-active,
        .v-leave-active {
        transition: all 0.6s ease;
        }

