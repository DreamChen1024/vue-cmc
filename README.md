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

## 首页

这里用到的是`mint-ui` 和 `mui` 库

### 1.首先引入 `mint-ui` 库(你可以引入整个 Mint UI，或是根据需要仅引入部分组件。注:我是按需引入)
    
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
    
### 2.头部Header
    引入
        import { Header } from 'mint-ui';

        Vue.component(Header.name, Header);
    例子
    固定在页面顶部

        <mt-header fixed title="固定在顶部"></mt-header>

### 3.底部Footer(这里用的是`mui`库)

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

### 4.制作首页轮播图

4.1 通过mint-ui的swipe组件完成样式

4.2 使用vue-resource获取接口中的数据, 进行渲染

### 5.首页九宫格的样式改造

5.1 由于mint-ui没有合适的组件可供参考, 所以我们使用mui的(grid)代码片段作为改造的基础模板

5.2 修改结构并覆盖mui的默认样式

5.3 抽取全局的common.less样式, 通过main.js引入

### 6.添加组件切换动画
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

## 改造 新闻资讯 路由链接

## 新闻资讯 页面 制作
1. 绘制界面， 使用 MUI 中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link,同时，在跳转的时候应该提供唯一的Id标识符
2. 创建新闻详情的组件页面
3. 在路由模块中，将 新闻详情的 路由地址 和 组件页面对应起来

## 实现 新闻详情 的 页面布局 和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个 单独的 comment文件 组件模板(index.vue)
2. 在需要使用 comment 组件的 页面中，先手动 导入 comment 组件
 + `import comment from '../../components/comment/'`
3. 在父组件中，使用 `components` 属性，将刚才导入 comment 组件，注册为自己的 子组件
4. 将注册子组件时候的，注册名称，以 标签形式，在页面中 引用即可

## 获取所有的评论数据显示到页面中
1. getComments

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据
2. 点击加载更多，让 pageIndex++ , 然后重新调用 this.getComments() 方法重新获取最新一页的数据
3. 为了防止 新数据 覆盖老数据的情况，我们在 点击加载更多的时候，每当获取到新数据，应该让 老数据 调用 数组的 concat 方法，拼接上新数组

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则Toast提示用户 评论内容不能为空
4. 通过 vue-resource 发送一个请求，把评论内容提交给 服务器
5. 当发表评论OK后，重新刷新列表，以查看最新的评论
 + 如果调用 getComments 方法重新刷新评论列表的话，可能只能得到 最后一页的评论，前几页的评论获取不到
 + 两种思路：

 + 第一种:当评论成功后，在客户端，手动拼接出一个 最新的评论对象，然后 调用 数组的 unshift 方法， 把最新的评论，追加到  data 中 comments 的开头；这样，就能 完美实现刷新评论列表的需求；

 + 第二种: 重置pageIndex = 1, commentList: [], 再调用getComments 方法重新刷新评论列表,这是比较简单的一种方式, 避免出错.

## 改造图片分析 按钮为 路由的链接并显示对应的组件页面

## 绘制 图片列表 组件页面结构并美化样式
 1. 制作 顶部的滑动条
 2. 制作 底部的图片列表
### 制作顶部滑动条的坑们：
 1. 需要借助于 MUI 中的 tab-top-webview-main.html 
 2. 需要把 slider 区域的 mui-fullscreen 类去掉
 3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化一下：
  + 导入 mui.js 
  + 调用官方提供的 方式 去初始化：}()
  ```
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  ```
 4. 我们在初始化 滑动条 的时候，导入的 mui.js ，但是，控制台报错： `Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`
  + 经过合理的推测，觉得，可能是 mui.js 中用到了 'caller', 'callee', and 'arguments' 东西，但是， webpack 打包好的 bundle.js 中，默认是启用严格模式的，所以，这两者冲突了；
  + 解决方案： 1. 把 mui.js 中的 非严格 模式的代码改掉；但是不现实； 2. 把 webpack 打包时候的严格模式禁用掉；
  + 最终，我选择了 .babelrc文件加入

        "ignore": [
            "./src/lib/mui/js/*.js"
        ] 
  + 让 webpack 打包工具 忽略 mui 中的 .js文件
 5. 刚进入 图片分享页面的时候， 滑动条无法正常工作， 经过我们认真的分析，发现， 如果要初始化 滑动条，必须要等 DOM 元素加载完毕，所以，我们把 初始化 滑动条 的代码，搬到了 mounted 生命周期函数中；
 6. 当 滑动条 调试OK后，发现， tabbar 无法正常工作了，这时候，我们需要把 每个 tabbar 按钮的 样式中  `mui-tab-item` 重新改一下名字；
 7. 获取所有分类，并渲染 分类列表；

### 制作图片列表区域
1. 图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供的现成的 组件 `lazy-load`
2. 根据`lazy-load`的使用文档，尝试使用
3. 渲染图片列表数据

### 实现了 图片列表的 懒加载改造和 样式美化

## 实现了 点击图片 跳转到 图片详情页面
1. 在改造 li 成 router-link 的时候，需要使用 tag 属性指定要渲染为哪种元素

## 实现 详情页面的布局和美化，同时获取数据渲染页面

## 实现 图片详情中 缩略图的功能
1. 使用 插件 vue2-preview 这个缩略图插件
2. 获取到所有的图片列表，然后使用 v-for 指令渲染数据
3. 注意： img标签上的class不能去掉
4. 注意： 每个 图片数据对象中，必须有 w 和 h 属性