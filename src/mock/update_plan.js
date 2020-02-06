const Mock = require('mockjs')
import storageUtils from '@/mock/storageUtils'
// localStorage
Mock.mock('/api/update_plan', (req, res) => {
    console.log('update')
    let update = JSON.parse(req.body)
    console.log(update)
    const data = storageUtils.getData("plans")

    // 更新计划
    const plan = data.find(item => item.id == update.plan.id)
    data.forEach(item => {
        if (item.id == update.plan.id) {
            //①增加至已完成done
            const add = JSON.parse(update.update_value) - 0
            console.log(item)
            item.done += add
            //②更新今天的数据today_done
            if (item.update_time == storageUtils.today()) {
                item.today_done += add
            } else {
                item.update_time = storageUtils.today()
                item.today_done = add
            }
            //③更新每日计划per_now
            item.per_now = (item.total-item.done)/storageUtils.remainDays(item.end_at)
        }
    })
    console.log(data)
    // 新建计划
    if (!plan) {
        console.log('new')
        update.plan.today_done = 0
        update.plan.update_time = storageUtils.today()
        data.push(update.plan)
    }
    localStorage.plans = JSON.stringify(data)
    // return data
})