//引入mockjs
const Mock = require('mockjs')
//使用mockjs模拟数据

// 获取plan
Mock.mock('/api/data', (req, res) => {
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
            'unit|': ['课', '页', '节'],
            'ver|1': [1, 2],
            // author: '@date("yyyy/MM/dd")',
            // status: '待审核',
            // pageviews: '@ctitle(8)' + '有限公司'
        }]
    })
    console.log('mock')
    return {
        data: data
    }
})