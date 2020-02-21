const Mock = require('mockjs')
import storageUtils from '@/mock/storageUtils'
Mock.mock('/api/close_plan',(req, res)=>{
    const plans = storageUtils.getData('plans')
    plans.forEach(item =>{
        if(item.id==req.body){
            item.status = 9
        }
    })
    localStorage.plans = JSON.stringify(plans)
    return {flag:'success'}
})