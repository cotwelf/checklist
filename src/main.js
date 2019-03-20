import Vue from "vue";
import MuseUI from "muse-ui";
import App from "./App.vue";
import Vuex from 'vuex';
Vue.use(Vuex);
import Axios from "axios";
Vue.prototype.$axios = Axios;
// Axios.defalts.baseURL = 
import "muse-ui/dist/muse-ui.css";
import "muse-ui-message/dist/muse-ui-message.css";
import Message from "muse-ui-message";
import Toast from "muse-ui-toast";
Vue.use(MuseUI);

import "./img/icon/iconfont.css";
import Moment from 'moment';
// 定义全局过滤器
Vue.filter('converDate', function (value) {
  return Moment(value).format('YYYY-MM-DD')
})
Vue.use(Message);
// Vue.use(Toast);
Vue.use(Toast, {
  close: false,
  position: "top-end"
});

Vue.config.productionTip = false;

// // routes
import router from './router'
// import VueRouter from "vue-router";
// Vue.use(VueRouter);
// import header from "./components/header.vue";
// import footer from "./components/footer.vue";
// import Home from "./components/plan/plan_list.vue";
// import Project from "./components/project/project_list.vue";
// import NewProject from "./components/project/project_new.vue"
// import Mine from "./components/mine.vue";
// import NewPlan from "./components/plan/plan_new.vue"
// import ProjectDetail from "./components/project/project_detail.vue"


// project

// Vue.component("headerVue", header);
// Vue.component("footerVue", footer);
// let router = new VueRouter({
//   routes: [{
//       path: '/',
//       redirect: {
//         name: 'home'
//       }
//     },
//     {
//       name: "home",
//       path: "/todo",
//       component: Home
//     },
//     {
//       name: "project",
//       path: "/projects",
//       component: Project,
//       children: []
//     },
//     {
//       name: 'pro_detail',
//       path: "/project_detail",
//       component: ProjectDetail
//     },
//     {
//       name: "mine",
//       path: "/mine",
//       component: Mine
//     },
//     {
//       name: 'newproject',
//       path: '/projects/new',
//       component: NewProject
//     },
//     {
//       name: 'newplan',
//       path: '/plan/new',
//       component: NewPlan
//     }
//   ]
// });
new Vue({
  el: "#app",
  router,
  // router: router,
  render: h => h(App)
});