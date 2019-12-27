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

// storage 获取plan
import storageUtils from '@/mock/storageUtils'
Mock.mock('/api/getplans', (req, res) => {
    console.log('plan_storage')
    const data = storageUtils.getData(localStorage.plans)
    console.log(data)
    const todo = []
    for(var i=0;i<data.length;i++){
      let index = i
      let status = data[index].status
      status==0?todo.push(data[index]):''
    }
    console.log(todo)
    //     var records = storageUtils.getData(localStorage.records);
    //     console.log(records)
    //     for (var i = 0; i < tasks.length; i++) {
    //       tasks[i].dose = 0;
    //     }
    //     if (records.length > 0) {
    //       for (var i = 0; i < records.length; i++) {
    //         var plan_id = records[i].plan_id;
    //         if (records[i].finished_at == this.today) {
    //           var done = records[i].done;
    //           for (var j = 0; j < tasks.length; j++) {
    //             if (tasks[j].id == plan_id) {
    //               tasks[j].dose = Math.round(done * 100) / 100;
    //             }
    //           }
    //         }
    //       }
    //     }
    return data
})