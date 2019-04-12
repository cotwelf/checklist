import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        today: '',
    },
    mutations: {
        planlist(state, data) {
            // state.planlist.push(data)
            state.planlist = data
            // Vue.set(state, 'planlist', data)
        }
    },
    actions: {

    },
})

export default store