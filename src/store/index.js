import Vue from 'vue'
import Vuex from 'vuex'
import projects from './modules/projects'
import users from './modules/users'
import getters from './getters'
import global from './modules/global'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        users,
        projects,
        global
    },
    getters
})

export default store