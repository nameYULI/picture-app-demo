/*
 * @Description: 
 * @Author: yuli
 * @Date: 2021-01-29 15:16:36
 * @LastEditors: yuli
 * @LastEditTime: 2021-01-29 20:40:17
 */
import Vue from 'vue'
import App from './App'
import request from './utils/request'

Vue.config.productionTip = false
Vue.prototype.request = request

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
