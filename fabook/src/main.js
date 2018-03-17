// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Calendar from 'vue-calendar-component'
Vue.use(VueResource)
Vue.use(Calendar)

Vue.config.productionTip = false
Vue.prototype.memeryData = {}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
