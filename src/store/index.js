import Vue from 'vue'
import Vuex from 'vuex'
import projects from './modules/projects'
import users from './modules/users'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        users,
        projects
    },
    getters
})

export default store