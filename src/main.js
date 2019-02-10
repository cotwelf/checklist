import Vue from 'vue'
import App from './App.vue'

import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI);


Vue.config.productionTip = false

// routes
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import header from './components/header.vue';
import footer from './components/footer.vue';
import Home from './components/home.vue';
Vue.component('headerVue',header);
Vue.component('footerVue',footer);
let router = new VueRouter({
  routes:[{
    name:'home',path:'/',component:Home
  }]
})
new Vue({
  el:'#app',
  router:router,
  render: h => h(App),
})
