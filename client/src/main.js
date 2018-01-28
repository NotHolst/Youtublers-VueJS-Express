// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import {sync} from 'vuex-router-sync'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueSocketio from 'vue-socket.io';

Vue.use(Vuetify)
Vue.use(VueSocketio, 'http://localhost:1337');

Vue.config.productionTip = false
sync(store, router)


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

