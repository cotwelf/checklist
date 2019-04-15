const users = {
    state: {
        plans: [],
        projects: []
    },
    mutations: {
        GET_PLANS: (state, plans) => {
            state.plans = plans
        }
    },
    actions:{
        getPlans({})
    }
}

export default users