import Vue from 'vue'
import App from './App.vue'
import './assets/index.css'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios';
import global_ from './Global.vue'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Element)

Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL=global_.BASE_URL;
Vue.prototype.$ajax = axios;
Vue.prototype.$bus = new Vue();
Vue.prototype.$confirm = Element.MessageBox.confirm

new Vue({
  el:'#app',
  render: h => h(App),
  router: router
})
