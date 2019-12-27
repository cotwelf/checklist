const Mock = require('mockjs')

// mock
Mock.mock('/update_plans/mock',(req,res)=>{
    const data = Mock.mock({
        'items|10':[{
            'done':1,
            'finished_at':'@datetime',
            'plan_id':'@integer(100,500)'
        }]
    })
})

// 更新localstorage
Mock.mock('/update_plans',(req,res)=>{
    const data = Mock.mock({
        'items|10':[{
            'done':1,
            'finished_at':'@datetime',
            'plan_id':'@integer(100,500)'
        }]
    })
})
