import Vue from 'vue'
import Router from 'vue-router'
import MostPopular from '@/components/MostPopular'
import MyVideos from '@/components/MyVideos'
import UploadVideo from '@/components/UploadVideo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
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
    }
  ]
})
