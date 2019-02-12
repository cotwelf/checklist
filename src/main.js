import Vue from 'vue'
import App from './App.vue'

import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import './img/icon/iconfont.css';
import Toast from 'muse-ui-toast';
import 'muse-ui-message/dist/muse-ui-message.css';
import Message from 'muse-ui-message';
Vue.use(Message);
// Vue.use(Toast);
Vue.use(Toast, {
  close: false,
  position: 'top-end',
});

Vue.use(MuseUI);


Vue.config.productionTip = false

// routes
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import header from './components/header.vue';
import footer from './components/footer.vue';
import Home from './components/home.vue';
import Plans from './components/master_plans.vue';
import Mine from './components/mine.vue';
Vue.component('headerVue', header);
Vue.component('footerVue', footer);
let router = new VueRouter({
  routes: [{
    name: 'home',
    path: '/',
    component: Home
  }, {
    name: 'plans',
    path: '/master_plans',
    component: Plans
  }, {
    name: 'mine',
    path: '/mine',
    component: Mine
  }]
})
new Vue({
  el: '#app',
  router: router,
  render: h => h(App),

})