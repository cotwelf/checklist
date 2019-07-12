//引入mockjs
const Mock = require('mockjs')
//使用mockjs模拟数据

// 获取plan
Mock.mock('/api/data', (req, res) => {
    const data = Mock.mock({
        'items|5': [{
            // created_at: '@date("yyyy/MM/dd")',
            // end_at: '2020/3/3',          根据created_at和end_at 在后端计算剩余时间remain_day
            remain_day: 50,
            'done|0-10.2': 1,
            'dose|0-5.2': 1, // dose为当日已完成（后端从finished表中判断当日完成量）

            name: '@cname()',
            id: '@integer(100,500)',
            'level|1': [1, 2, 3, 4],
            'type|1': [5, 6, 1],
            'per|0-5.2': 1,
            pid: '@integer(100,500)',
            // 'status|1': [10, 0],  status后端过滤
            'total|10-100.2': 1,
            'unit|1': ['课', '页', '节'],
            'ver|1': [1, 2]
        }]
    })
    return {
        data: data
    }
})