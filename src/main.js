import Vue from 'vue'
import './pollyfills'
import VueRouter from 'vue-router'
import VueNotify from 'vue-notifyjs'
import VeeValidate from 'vee-validate'
import VueResource from 'vue-resource'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import App from './App.vue'

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import SideBar from './components/UIComponents/SidebarPlugin'
import initProgress from './progressbar';

// router setup
import routes from './routes/routes'

// library imports

import './assets/sass/paper-dashboard.scss'
import './assets/sass/element_variables.scss'
import './assets/sass/demo.scss'

// Moment locale
// const moment = require('moment')
// require('moment/locale/pt')

import sidebarLinks from './sidebarLinks'
// plugin setup
Vue.use(VueRouter)
Vue.use(GlobalDirectives)
Vue.use(GlobalComponents)
Vue.use(VueNotify)
Vue.use(SideBar, {sidebarLinks: sidebarLinks})
Vue.use(VeeValidate)
Vue.use(VueResource)
Vue.use(require('vue-moment'))
locale.use(lang)

// configure router
const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: 'history'
})

console.log(process.env.VUE_APP_API)

window.axios = require('axios')

window.axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
window.axios.defaults.headers.post['Content-Type'] = 'application/json'
window.axios.defaults.headers.put['Content-Type'] = 'application/json'

window.axios.defaults.baseURL = process.env.VUE_APP_API || "http://localhost:3000"

window.axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('default_auth_token')

    if (token) {
      config.headers['Authorization'] = 'JWT ' + token
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

Vue.http.options.root = process.env.VUE_APP_API

initProgress(router);

Vue.router = router

Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  rolesVar: 'type',
  loginData: { url: 'auth', method: 'POST', redirect: '/', fetchUser: true },
  fetchData: { url: 'auth/user', method: 'GET' },
  refreshData: { url: 'auth/refresh', method: 'GET', atInit: false }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
