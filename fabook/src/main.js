// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Calendar from 'vue-calendar-component'
// eslint-disable-next-line
import { Loadmore } from 'mint-ui'
// eslint-disable-next-line
import { Range } from 'mint-ui'
// eslint-disable-next-line
import { Radio } from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(VueResource)
Vue.use(Calendar)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Range.name, Range)
Vue.component(Radio.name, Radio)

Vue.config.productionTip = false
Vue.prototype.memeryData = {}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

document.addEventListener("plusready", function() {
  // 注册返回按键事件
  plus.key.addEventListener('backbutton', function() {
    // 事件处理
    plus.nativeUI.confirm("退出程序？", function(event) {
      if (event.index) {
        plus.runtime.quit();
      }
    }, null, ["确定", "取消"]);
  }, false);
});
