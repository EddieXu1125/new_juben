import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/quick'
  },
  {
    path: '/quick',
    component: Layout,
    redirect: '/quick/index',
    children: [{
      path: 'index',
      name: 'quick',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '最近阅读', icon: 'dashboard' }
    }]
  },
  {
    path: '/menu',
    component: Layout,
    redirect: '/menu/index',
    children: [
      {
        path: 'index',
        name: 'menu',
        component: () => import('@/views/menu/index'),
        meta: { title: '层级目录', icon: 'nested' },
      },
      {
        path: "e/:encode_drama_id/allCards",
        name: 'all_chang',
        component:() => import('@/views/menu/all_chang'),
        props:true,
        hidden: true
      },
      {
        path:"e/:encode_drama_id",
        name: 'episode',
        component:() => import('@/views/menu/episode'),
        props:true,
        hidden: true
      },
      // {
      //   path:"e/:encode_drama_id/:encode_episode_id",
      //   component:Jeditor_chang,
      //   props:true
      // },
        //   {path:"e/:encode_drama_id/:encode_episode_id/:encode_scene_id",component:Jeditor_editor,props:true},
        //   {path:"faste/:encode_drama_id/:encode_episode_id/:encode_scene_id",component:jeditor_fast_editor,props:true},
    ]
  },

//   {
//     path:"/board",component: MainFrame,
//     children:[
//         {path:"e",component:Jeditor_Ju,alias: '/'},
//         {path:"e/:encode_drama_id",component:Jeditor_Ji,props:true},
//         {path:"e/:encode_drama_id/allCards",component:jeditor_all_chang,props:true},
//         {path:"e/:encode_drama_id/:encode_episode_id",component:Jeditor_chang,props:true},
//         {path:"e/:encode_drama_id/:encode_episode_id/:encode_scene_id",component:Jeditor_editor,props:true},
//         {path:"faste/:encode_drama_id/:encode_episode_id/:encode_scene_id",component:jeditor_fast_editor,props:true},
//         {path:"board/rm",component:Manager,
//             children:[
//                 {path:"",redirect: "Character"},
//                 {path:"Relation",component:Relation_Manager},
//                 {path:"Character",component: Character_Manager}
//             ]
//         },
//         {path:"board/ed",component:ExternalDB},
//         {path:"board/edf",component:ExternalDBFrame},

//         {path:"building",component:Building},
//     ]
// }

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: '',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
