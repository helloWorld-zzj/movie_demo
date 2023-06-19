import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入视图组件
import Films from '@/views/Films-view.vue'
import Center from '@/views/Center-view.vue'
import CinemaDetail from '@/views/CinemaDetail-view.vue'
// 二级路由组件
import NowPlaying from '@/views/Films/now-playing.vue'
import ComingSoon from '@/views/Films/coming-soon.vue'
// 电影详情的每个电影的日程
import Show from '@/views/Cinemas/show.vue'
// 三级路由
// 电影每一档等信息
import dateShow from '@/views/Cinemas/showinner.vue'

Vue.use(VueRouter) // 注册

// 配置表
const routes = [
  {
    path: '/films',
    component: Films,
    // 二级路由
    children: [{
      path: '/films/nowPlaying',
      component: NowPlaying
    },
    {
      path: '/films/comingSoon',
      component: ComingSoon
    },
    // 未选择时重定向到正在热映
    {
      path: '/films',
      redirect: '/films/nowPlaying'
      // alias: '/666' // 别名
    }
    ]
  },
  {
    path: '/cinemas',
    component: () => import('@/views/Cinemas-view.vue')
  },
  {
    path: '/center',
    component: Center
  },
  {
    name: 'FilmDetail',
    path: '/detail/:filmid',
    component: () => import('@/views/Detail-view.vue')
  },
  {
    name: 'CitySelect',
    path: '/city',
    component: () => import('@/views/City-view.vue')
  },
  // 影院详情
  {
    name: 'CinemaDetail',
    path: '/cinemas/:cinemaid/film',
    component: CinemaDetail,
    children: [
      {
        name: 'FilmShow',
        path: '/cinemas/:cinemaid/film/:filmid',
        component: Show,
        // 三级路由
        children: [
          {
            name: 'DateShow',
            path: '/cinemas/:cinemaid/film/:filmid/:date',
            component: dateShow
          }
        ]
      }
    ]
  },
  {
    name: 'CinemaSearch',
    path: '/cinema/search',
    component: () => import('@/views/CinemaSearch.vue')
  },
  // 非法路由重定向
  {
    path: '*',
    redirect: '/films/nowPlaying'
  }
]

const router = new VueRouter({
  // history路由模式
  mode: 'hash',
  routes
})

// 路由拦截
router.beforeEach((to, from, next) => {
  // console.log(to, from)

  next()
})
export default router
