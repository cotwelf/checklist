import Vue from "vue";
import MuseUI from "muse-ui";
import App from "./App.vue";
import Axios from "axios";
Vue.prototype.$axios = Axios;

import "muse-ui/dist/muse-ui.css";
import "muse-ui-message/dist/muse-ui-message.css";
import Message from "muse-ui-message";
import Toast from "muse-ui-toast";
Vue.use(MuseUI);

import "./img/icon/iconfont.css";

Vue.use(Message);
// Vue.use(Toast);
Vue.use(Toast, {
  close: false,
  position: "top-end"
});

Vue.config.productionTip = false;

// routes
import VueRouter from "vue-router";
Vue.use(VueRouter);
import header from "./components/header.vue";
import footer from "./components/footer.vue";
import Home from "./components/plan/plan_list.vue";
import Project from "./components/project/project_list.vue";
import NewProject from "./components/project/project_new.vue"
import Mine from "./components/mine.vue";
import NewPlan from "./components/plan/plan_new.vue"
import ProjectDetail from "./components/project/project_detail.vue"


// project

Vue.component("headerVue", header);
Vue.component("footerVue", footer);
let router = new VueRouter({
  routes: [{
      name: "home",
      path: "/",
      component: Home
    },
    {
      name: "project",
      path: "/projects",
      component: Project,
      children: []
    },
    {
      name: 'pro_detail',
      path: "/project_detail",
      component: ProjectDetail
    },
    {
      name: "mine",
      path: "/mine",
      component: Mine
    },
    {
      name: 'newproject',
      path: '/projects/new',
      component: NewProject
    },
    {
      name: 'newplan',
      path: '/plan/new',
      component: NewPlan
    }
  ]
});
new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});