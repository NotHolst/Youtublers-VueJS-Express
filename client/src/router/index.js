import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '@/components/SignUp'
import Login from '@/components/Login'
import MostPopular from '@/components/MostPopular'
import MyVideos from '@/components/MyVideos'
import UploadVideo from '@/components/UploadVideo'
import Watch from '@/components/Watch'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'MostPopular',
      component: MostPopular
    },
    {
      path: '/subscriptions',
      name: 'MostPopular',
      component: MostPopular
    },
    {
      path: '/user/videos',
      name: 'MyVideos',
      component: MyVideos
    },
    {
      path: '/user/videos/upload',
      name: 'UploadVideo',
      component: UploadVideo
    },
    {
      path: '/watch',
      name: 'Watch',
      component: Watch
    },
  ]
})
