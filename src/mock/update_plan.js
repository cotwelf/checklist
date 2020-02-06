const Mock = require('mockjs')
import storageUtils from '@/mock/storageUtils'
// localStorage
Mock.mock('/api/update_plan', (req, res) => {
    let update = JSON.parse(req.body)
    const data = storageUtils.getData("plans")

    // 更新计划
    const plan = data.find(item => item.id == update.plan.id)
    data.forEach(item => {
        if (item.id == update.plan.id) {
            //①增加至已完成done
            const add = JSON.parse(update.update_value) - 0
            item.done += add
            //②更新今天的数据today_done
            item.today_done += add
        }
    })
    // 新建计划
    if (!plan) {
        update.plan.today_done = 0
        update.plan.update_time = storageUtils.today()
        data.push(update.plan)
    }
    localStorage.plans = JSON.stringify(data)
    return data
})