import Vue from 'vue';
import Vuex from 'vuex';
import projects from './modules/projects';
import plans from './modules/plans';

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        projects,
        plans,
    },

})

export default store