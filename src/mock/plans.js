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
    let reqStatus = JSON.parse(req.body).status;
    const plans = storageUtils.getData("plans")
    console.log(data)
    const record = storageUtils.getData("record")
    console.log(record)
    const list = []
    // 正在进行中的项目
    for(var i=0;i<data.length;i++){
      let index = i
      let status = data[index].status
      status==reqStatus?list.push(data[index]):''
    }
    return data
})