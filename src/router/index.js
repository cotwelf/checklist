import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import header from "./../components/header.vue";
import footer from "./../components/footer.vue";
import Home from "./../views/plan_list.vue";
import Project from "./../views/project_list.vue";
import NewProject from "./../views/project_new.vue"
import Mine from "./../views/mine.vue";
import NewPlan from "./../views/plan_new.vue"
import ProjectDetail from "./../components/project/project_detail.vue"


// project

Vue.component("headerVue", header);
Vue.component("footerVue", footer);
export const constantRouterMap = [
  {
    path: '/',
    redirect: {
      name: 'home'
    }
  },
  {
    name: "home",
    path: "/todo",
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
];
export default new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})