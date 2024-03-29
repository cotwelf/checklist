import Vue from "vue";
import App from "./App.vue";


// MuseUI
import MuseUI from "muse-ui";
import Toast from "muse-ui-toast";
import Message from "muse-ui-message";
import "muse-ui-message/dist/muse-ui-message.css";
import "muse-ui/dist/muse-ui.css";
Vue.use(MuseUI);
Vue.use(Message);


Vue.use(Toast, {
  close: false,
  position: "top"
});

import Vuex from 'vuex';
Vue.use(Vuex);
import store from './store';

import Axios from "axios";
Vue.prototype.$axios = Axios;




import "./img/icon/iconfont.css";
import Moment from 'moment';
// 定义全局过滤器
// Vue.filter('converDate', function (value) {
//   return Moment(value).format('YYYY-MM-DD')
// })

Vue.config.productionTip = false;
// // // routes
import router from './router';

// 引入mockjs
require('./mock/index.js')
new Vue({
  el: "#app",
  router, // router: router,
  store,
  render: h => h(App) //相当于template: '<App/>,但它没有编译和渲染功能，此处直接用render渲染组件即可
});