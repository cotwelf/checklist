import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// import MintUi from 'mint-ui'
// import MuseUI from 'muse-ui';
// import 'muse-ui/dist/muse-ui.css';
// import 'mint-ui/lib/style.css'
// Vue.use(MuseUI);
Vue.use(VueRouter);
// Vue.user(MintUi);
Vue.config.productionTip = false

new Vue({
  el:'#app',
  render: h => h(App),
})
