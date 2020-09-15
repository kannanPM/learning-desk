import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

/* Router modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

Vue.use(Router)

/*
  Note: sub-menu only appear when children.length>=1
  Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

/**
  ConstantRoutes
  a base page that does not have permission requirements
  all roles can be accessed
*/
export const constantRoutes: RouteConfig[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/auth-redirect',
    component: () => import(/* webpackChunkName: "auth-redirect" */ '@/views/login/auth-redirect.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "401" */ '@/views/error-page/401.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import(/* webpackChunkName: "documentation" */ '@/views/documentation/index.vue'),
  //       name: 'Documentation',
  //       meta: { title: 'documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    meta: { hidden: true },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/index.vue'),
        name: 'Profile',
        meta: {
          title: 'profile',
          icon: 'user',
          noCache: true
        }
      }
    ]
  }
]



export const asyncRoutes: RouteConfig[] = [
  {
    path: '/category',
    component: Layout,
    redirect: '/category/list',
    meta: {
      title: 'categories',
      icon: 'example'
    },
    children: [
       
      
      {
        path: 'list',
        component: () => import(/* webpackChunkName: "category-list" */ '@/views/category/list.vue'),
        name: 'CategoryList',
        meta: {
          title: 'categories',
          icon: 'example'
        }
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    meta: {
      title: 'courses',
      icon: 'example'
    },
    children: [
       {
        path: 'create',
        component: () => import(/* webpackChunkName: "course-create" */ '@/views/course/create.vue'),
        name: 'CreateCourse',
        meta: {
          title: 'create',
          icon: 'edit'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import(/* webpackChunkName: "course-edit" */ '@/views/course/edit.vue'),
        name: 'EditCourse',
        meta: {
          title: 'edit',
          noCache: true,
          activeMenu: '/course/list',
          hidden: true
        }
      },
      {
        path: 'list',
        component: () => import(/* webpackChunkName: "course-list" */ '@/views/course/list.vue'),
        name: 'CourseList',
        meta: {
            title: 'courses',
            icon: 'example'
        }
      }
    ]
  },

     {
    path: '/event',
    component: Layout,
    redirect: '/event/list',
    meta: {
      title: 'events',
      icon: 'example'
    },
    children: [

       {
        path: 'create',
        component: () => import(/* webpackChunkName: "event-create" */ '@/views/event/create.vue'),
        name: 'CreateEvent',
        meta: {
          title: 'create',
          icon: 'edit'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import(/* webpackChunkName: "event-edit" */ '@/views/event/edit.vue'),
        name: 'EditEvent',
        meta: {
          title: 'edit',
          noCache: true,
          activeMenu: '/event/list',
          hidden: true
        }
      },
      {
        path: 'list',
        component: () => import(/* webpackChunkName: "event-list" */ '@/views/event/list.vue'),
        name: 'EventList',
        meta: {
          title: 'events',
          icon: 'example'
        }
      }
    ]
  },

     {
    path: '/student',
    component: Layout,
    redirect: '/student/list',
    meta: {
      title: 'students',
      icon: 'example'
    },
    children: [

       {
        path: 'create',
        component: () => import(/* webpackChunkName: "student-create" */ '@/views/student/create.vue'),
        name: 'CreateStudent',
        meta: {
          title: 'create',
          icon: 'edit'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import(/* webpackChunkName: "student-edit" */ '@/views/student/edit.vue'),
        name: 'EditStudent',
        meta: {
          title: 'edit',
          noCache: true,
          activeMenu: '/student/list',
          hidden: true
        }
      },
      {
        path: 'list',
        component: () => import(/* webpackChunkName: "student-list" */ '@/views/student/list.vue'),
        name: 'StudentList',
        meta: {
          title: 'students',
          icon: 'example'
        }
      }
    ]
  },

       {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/list',
    meta: {
      title: 'teachers',
      icon: 'example'
    },
    children: [

       {
        path: 'create',
        component: () => import(/* webpackChunkName: "teacher-create" */ '@/views/teacher/create.vue'),
        name: 'CreateTeacher',
        meta: {
          title: 'create',
          icon: 'edit'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import(/* webpackChunkName: "course-edit" */ '@/views/teacher/edit.vue'),
        name: 'EditTeacher',
        meta: {
          title: 'edit',
          noCache: true,
          activeMenu: '/teacher/list',
          hidden: true
        }
      },
      {
        path: 'list',
        component: () => import(/* webpackChunkName: "teacher-list" */ '@/views/teacher/list.vue'),
        name: 'TeacherList',
        meta: {
          title: 'teachers',
          icon: 'example'
        }
      }
    ]
  },

  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]


const createRouter = () => new Router({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
