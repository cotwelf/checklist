const projectStore = {
    state: {
        count: 0,
        pro_list: []
    },
    mutations: {
        increment(state) {
            state.count++
        },
        getProList() {

        }
    },
    computed: {
        pro_list() {
            return this.$store.state.pro_list
        }
    }
}

export default projectStore