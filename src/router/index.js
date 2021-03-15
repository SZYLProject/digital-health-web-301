import Vue from 'vue'
import Router from 'vue-router'
/* BasicLayout */
import BasicLayout from '@/layout/BasicLayout'
import DetailsLayout from '@/layout/DetailsLayout'
Vue.use(Router)

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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    component: () => import('@/views/Login'),
    name: 'Login'
  },
  {
    path: '/forgotPassword',
    component: () => import('@/views/Login/ForgotPwd'),
    name: 'ForgotPwd'
  },
  {
    path: '/404',
    component: () => import('@/views/ErrorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/ErrorPage/401'),
    hidden: true
  },
  // 专病库首页
  {
    // path: '/specialDisease',
    path: '/specialDisease',
    component: BasicLayout,
    // redirect: '/index',
    redirect: 'specialDisease/index',
    children: [
      {
        path: 'specialDisease/index',
        component: () => import('@/views/HomeSpecialDisease'),
        name: 'HomeSpecialDisease'
      }
    ]
  },
  // 病种首页
  {
    // path: '/',
    path: '/home',
    component: BasicLayout,
    redirect: '/',
    children: [
      {
        path: '/',
        component: () => import('@/views/Home'),
        name: 'Home'
      },
      // 患者收藏
      {
        path: 'patientCollect',
        component: () => import('@/views/PatientCollect'),
        name: 'PatientCollect'
      }
    ]
  },
  // 患者详情
  {
    path: '/view360/:personId/:parentId',
    component: DetailsLayout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/View360'),
        name: 'View360'
        // props: true
      }
    ]
  },
  // 病例搜索模块
  {
    // path: '/CasesOfSearch',
    path: '/',
    component: BasicLayout,
    redirect: 'CasesOfSearch/CaseSearchHome',
    name: 'CasesOfSearch',
    children: [
      {
        path: 'CasesOfSearch/CaseSearchHome',
        component: () => import('@/views/CasesOfSearch/CaseSearchHome'),
        name: 'CaseSearchHome'
      },
      // 关键字搜索
      {
        path: 'CasesOfSearch/KeywordsSearch',
        component: () => import('@/views/CasesOfSearch/KeywordsSearch'),
        name: 'CasesOfSearch'
      },
      // 高级搜索
      {
        path: 'CasesOfSearch/AdvancedSearch',
        component: () => import('@/views/CasesOfSearch/AdvancedSearch'),
        name: 'AdvancedSearch'
      },
      // 条件树
      {
        path: 'CasesOfSearch/ConditionTreeSearch',
        component: () => import('@/views/CasesOfSearch/ConditionTreeSearch'),
        name: 'ConditionTreeSearch'
      }
    ]
  },

  // 数据字典
  {
    path: '/DataDictionary',
    component: BasicLayout,
    redirect: '/index',
    name: 'DataDictionary',
    children: [
      {
        path: 'DataDicIndex',
        component: () => import('@/views/DataDictionary/DataDicIndex'),
        name: 'DataDicIndex'
      }

    ]
  },

  // 导出审批
  {
    path: '/ExportExamine',
    component: BasicLayout,
    redirect: '/index',
    name: 'ExportExamine',
    children: [
      {
        path: 'index',
        component: () => import('@/views/ExportExamine'),
        name: 'index'
      }
    ]
  },

  // 系统配置
  {
    path: '/ConfigManagement',
    component: BasicLayout,
    redirect: '/CollectionManage',
    name: 'ConfigManagement',
    children: [
      {
        path: 'CollectionManage',
        component: () => import('@/views/ConfigManagement/CollectionManage'),
        name: 'CollectionManage'
      }
    ]
  },

  // 项目管理
  {
    path: '/PM',
    component: BasicLayout,
    redirect: '/ProjectLists',
    name: 'ProjectLists',
    children: [
      {
        path: 'ProjectLists', //
        component: () => import('@/views/PM/ProjectLists'),
        name: 'ProjectLists'
      },
      // 項目創建
      // {
      //   path: 'ProjectCreate',
      //   component: () => import('@/views/PM/ProjectCreate'),
      //   name: 'ProjectCreate'
      // },

      // 研究对象
      {
        path: '/ResearchObject/:stepName',
        component: () => import('@/views/PM/ResearchObject'),
        name: 'ResearchObject'
      },
      // 列表详情
      {
        path: '/ProjectListsDetails/:comName/:projectType', //
        component: () => import('@/views/PM/ProjectListsDetails'),
        name: 'ProjectListsDetails'
      },
      // 导出记录
      {
        path: 'ExportRecord', //
        component: () => import('@/views/PM/CreateEdit/components/ExportRecord'),
        name: 'ExportRecord'
      },
      // 待录入EDC
      {
        path: 'EDC', //
        component: () => import('@/views/PM/EDC'),
        name: 'EDC'
      }

    ]
  },
  // 知识库
  {
    path: '/knowledgeLibrary',
    component: BasicLayout,
    redirect: '/index',
    children: [
      {
        path: 'index', //
        component: () => import('@/views/KnowledgeLibrary/index.vue'),
        name: 'knowledgeLibrary'
      }
    ]
  },
  // 统计分析
  {
    path: '/statisticAnalysis',
    component: BasicLayout,
    redirect: '/index',
    name: 'statisticAnalysis',
    children: [
      {
        path: 'index', //
        component: () => import('@/views/StatisticAnalysis'),
        name: 'StatisticAnalysis'
      }
    ]
  },

  // 个人中心
  {
    path: '/personalCenter',
    component: BasicLayout,
    redirect: '/personalCenter',
    name: 'PersonalCenter',
    children: [
      {
        path: '/personalCenter',
        component: () => import('@/views/PersonalCenter'),
        name: 'PersonalCenter'
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
