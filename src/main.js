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
import Home from "./components/home.vue";
import Project from "./components/project/project_list.vue";
import Mine from "./components/mine.vue";


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
      name: "mine",
      path: "/mine",
      component: Mine
    }
  ]
});
new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});