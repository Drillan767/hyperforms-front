import Vue from 'vue'
import Router from 'vue-router'
// --------- FRONT -----------
import FrontLayout from '../front/FrontLayout'
import Landing from '../front/Landing'
import Bio from '../front/Bio'
import Shop from '../front/Shop'
import Contact from '../front/Contact'
// --------- ADMIN ---------------
import AdminLayout from '../admin/AdminLayout'
import Profile from '../admin/Profile'
import Settings from '../admin/Settings'
import NewsLetter from '../admin/Newsletter'
import Musics from '../admin/Musics'
// ---------- AUTH --------------
import Login from '../auth/Login'
import ResetPassword from '../auth/ResetPassword'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: FrontLayout,
      children: [
        {
          name: 'landing',
          path: '',
          component: Landing
        },
        {
          name: 'bio',
          path: 'bio',
          component: Bio
        },
        {
          name: 'shop',
          path: 'shop',
          component: Shop
        },
        {
          name: 'contact',
          path: 'contact',
          component: Contact
        }
      ]
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'profile',
          component: Profile,
          meta: { order: 1 }
        },
        {
          path: 'settings',
          name: 'settings',
          component: Settings,
          meta: { order: 2 }
        },
        {
          path: 'newsletter',
          name: 'newsletter',
          component: NewsLetter,
          meta: { order: 3 }
        },
        {
          path: 'musics',
          name: 'musics',
          component: Musics,
          meta: { order: 4 }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reset',
      name: 'reset',
      component: ResetPassword
    }
  ]
})
