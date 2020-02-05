const Mock = require('mockjs')
// 获取plan
Mock.mock('/api/getplans/mock', (req, res) => {
    console.log('plan_mock')
    const data = Mock.mock({
        'items|10': [{
            created_at: '@date("yyyy/MM/dd")',
            'done|0-10.2': 1,
            'dose|0-5.2': 1,
            end_at: '2020/3/3',
            name: '@cname()',
            id: '@integer(100,500)',
            'level|1': [1, 2, 3, 4],
            'per|0-5.2': 1,
            pid: '@integer(100,500)',
            'status|1': [10],
            'total|10-100.2': 1,
            'type|1':[1,5,6,7],
            'unit|': ['课', '页', '节'],
            'ver|1': [1, 2],
        }]
    })
    return data
})

// storage 获取todoplan
import storageUtils from '@/mock/storageUtils'
Mock.mock('/api/getplans', (req, res) => {
    console.log(storageUtils.today())
    const plans = storageUtils.getData("plans")
    console.log(plans)
    const list = {}
    // 1.更新计划
    plans.forEach(item=>{
        if(item.total==item.done||item.total<item.done){
            // 1-1.检查计划是否已完成(10完成)
            item.status=10
        }else if(Date.parse(item.end_at)<Date.parse(storageUtils.today())){
            // 1-2.检查计划是否延期(9烂尾)
            item.status=9
        }else{
            item.status=0
        }
    })
    list.todo = plans.filter(item => (item.status==0))
    list.done = plans.filter(item => (item.status==10))
    list.dead = plans.filter(item => (item.status==9))    
    return list
})