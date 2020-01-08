const Mock =  require('mockjs')
import storageUtils from '@/mock/storageUtils'
// localStorage
Mock.mock('/api/create-plan',(req,res)=>{
    console.log(req)
    const data = storageUtils.getData(localStorage.plans)
    console.log(data)
})