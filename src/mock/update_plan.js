const Mock = require('mockjs')
import storageUtils from '@/mock/storageUtils'
// localStorage
Mock.mock('/api/update_plan', (req, res) => {
    console.log('update')
    let update = JSON.parse(req.body)
    console.log(update)
    update.update_time = storageUtils.today()
    let data = storageUtils.getData("plans")
    // 更新计划
    const plan = data.filter(item => item.id == update.id)
    console.log(plan)
    // 新建计划
    if (plan) {
        console.log('new')
        update.today_done = 0
        data.push(update)
        localStorage.plans = JSON.stringify(data)
    }
    return data
})