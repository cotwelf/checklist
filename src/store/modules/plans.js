const planStore = {
    state: {
        count: 0,
        plan_list: []
    },
    mutations: {
        increment(state) {
            state.count++
        },
        getPlanList() {
            this.$axios
                .get("/api/get_todo_list", {
                    params: {
                        user_id: "1",
                        status: "0"
                    }
                })
                .then(tasks => {
                    state.plan_list = tasks.data;
                    console.log(state.plan_list);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    computed: {
        pro_list() {
            return this.$store.state.pro_list
        }
    }
}

export default planStore