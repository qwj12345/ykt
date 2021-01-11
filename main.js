import Vue from 'vue'
import App from './App'
//引入vuex
import store from './store'
import {myRequest} from './common/common.js'
//把vuex定义成全局组件
Vue.prototype.$store = store
// 挂载在Vue上 就不用每个页面都导入这个方法 直接this.myRequest()
Vue.prototype.myRequest = myRequest

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
