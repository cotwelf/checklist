import App from "./App.vue";
import Vue from "vue";


import Vuex from 'vuex';
Vue.use(Vuex);
import Axios from "axios";
Vue.prototype.$axios = Axios;

import MuseUI from "muse-ui";
Vue.use(MuseUI);
import "muse-ui/dist/muse-ui.css";
import "muse-ui-message/dist/muse-ui-message.css";

import "./img/icon/iconfont.css";
import Moment from 'moment';
// 定义全局过滤器
Vue.filter('converDate', function (value) {
  return Moment(value).format('YYYY-MM-DD')
})

import Message from "muse-ui-message";
import Toast from "muse-ui-toast";
Vue.use(Message);
// Vue.use(Toast);
Vue.use(Toast, {
  close: false,
  position: "top-end"
});

Vue.config.productionTip = false;

// // routes
import router from './router';
import store from './store';

new Vue({
  el: "#app",
  router,
  store,
  // router: router,
  render: h => h(App)
});