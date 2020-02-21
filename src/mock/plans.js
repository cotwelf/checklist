const Mock = require('mockjs')

// storage 获取todoplan
import storageUtils from '@/mock/storageUtils'
Mock.mock('/api/getplans', (req, res) => {
    const plans = storageUtils.getData("plans")
    console.log(plans)
    //查询特定计划
    if(JSON.parse(req.body).plan_id){
        return plans.filter(item => item.id == JSON.parse(req.body).plan_id)
    }
    //查询特定项目的计划
    if(JSON.parse(req.body).pid){
        return storageUtils.plansSort(plans.filter(item=>item.pid == JSON.parse(req.body).pid))
    }
    const list = {}
    plans.forEach(item => {
        // 1.更新计划状态
        if (item.total == item.done || item.total < item.done) {
            // 1-1.检查计划是否已完成(10完成)
            item.status = 10
        } else if (Date.parse(item.end_at) < Date.parse(storageUtils.today())) {
            // 1-2.检查计划是否延期(9烂尾)
            item.status = 9
        }
        //2.更新时间update_time
        if (item.update_time != storageUtils.today()) {
            item.update_time = storageUtils.today()
            item.today_done = 0
        }
        //3.更新每日计划per_now
        item.per_now = (((item.total - 0) - item.done) / storageUtils.remainDays(item.end_at)).toFixed(2)
    })
    localStorage.plans = JSON.stringify(plans)
    list.alive = plans.filter(item => (item.status == 0))
    list.completed = plans.filter(item => (item.status == 10))
    list.dead = plans.filter(item => (item.status == 9))
    list.show = storageUtils.plansSort(list.alive.filter(item => {
        const today = new Date()
        const week = today.getDay() //0:周日-6:周六
        // 2.显示计划
        // 2-1.和计划相比，每天需要增加量的显示，并添加per_now字段（当前每天应该完成数量）
        if ((item.total - item.done) / storageUtils.remainDays(item.end_at) > item.per) {
            item.per_now = (item.total - item.done) / storageUtils.remainDays(item.end_at)
            item.delay = 1
            return item
        }
        // 2-2.计划内的正常显示
        if (item.type == 1 && week == 0) {
            return item
        } else if (item.type == 5 && week != 6 && week != 0) {
            return item
        } else if (item.type == 6 && week != 0) {
            return item
        } else if (item.type == 7) {
            return item
        }
        // 2-3.只剩1天的显示
        if (item.end_at == storageUtils.today()) {
            return item
        } 
    }))
    return list
})