/*!

 =========================================================
 * Vue Light Bootstrap Dashboard - v2.0.0 (Bootstrap 4)
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import axios from "axios";
import store from './store/store'
import moment from 'moment'
// import VueMoment from 'vue-moment'

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
import routes from './routes/routes'

// bootstrap vue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// vuetify
import vuetify from './plugins/vuetify';

import './registerServiceWorker'
// plugin setup
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(LightBootstrap)

window.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
axios.defaults.headers.common = {
  "Authorization": "Bearer "+ store.state.bearer
}

Vue.prototype.moment = moment

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active',
  mode: "history",
  hash: false,
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.bearer === null) {
      next('/')
    } else {
      // axios({
      //   method: "GET",
      //   url: 'isAuthenticated',
      //   headers: {
      //     Authorization: `Bearer `+ store.state.bearer
      //   }
      // }).then((response) => {
      //   if (response.data.message === "Authenticated") {
      //     next()
      //   } else {
      //     next();
      //   }
      // })
      next()
    }
  } else {
    if (to.path === '/login') {
      if (store.state.bearer !== null) {
        next('/main/overview');
      } else {
        next();
      }
    } else {
      next();
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  vuetify,
  store
})
