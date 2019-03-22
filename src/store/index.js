import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import Axios from "axios";

const store = new Vuex.Store({
    state: {
        count: 10,
        planlist: [233]
    },
    mutations: {
        planlist(state, data) {
            // state.planlist.push(data)
            state.planlist = data
            // Vue.set(state, 'planlist', data)
        }
    },
    actions: {
        getPlanList(state, data) {
            Axios
                .get("/api/get_todo_list", {
                    params: {
                        user_id: data.user_id,
                        status: data.status
                    }
                })
                .then(tasks => {
                    // console.log('以下为store打印');

                    // console.log(tasks.data)
                    store.commit('planlist', tasks.data)
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
})

export default store