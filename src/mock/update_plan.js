const Mock =  require('mockjs')
import storageUtils from '@/mock/storageUtils'
// localStorage
Mock.mock('/api/update_plan',(req,res)=>{
    console.log('update')
    let update=JSON.parse(req.body)
    let data = storageUtils.getData(localStorage.plans)
    let count=0
    console.log(data)
        // 更新计划
        for(let n in data){
            if(data[n].id == update.id){
                console.log(data[n].id +'=='+ update.id)
                console.log('update')
                count++
            }        
        }
        // 新建计划
        if(count==0){
            data.push(update)
            localStorage.plans = JSON.stringify(data)
        }
    return data
})