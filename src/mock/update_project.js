const Mock =  require('mockjs')
import storageUtils from '@/mock/storageUtils'
// localStorage
Mock.mock('/api/update_project',(req,res)=>{
    let update= JSON.parse(req.body)
    let data = storageUtils.getData("projects")
    console.log(data)
    console.log("data.length"+data.length)
    let count=0
    // 更新项目
    for(let i=0;i<data.length;i++){
        console.log(data[i].id)
    }
    // for(let n in data){
    //     console.log(data[n].id)
    //     console.log(update.id)
    //     if(data[n].id == update.id){
    //         console.log(data[n].id +'=='+ update.id)
    //         console.log('update')
    //         count++
    //     }        
    // }
    // 新建项目
    console.log(count)
    if(count==0){
        data.push(update)
        console.log(data)
        localStorage.projects = JSON.stringify(data)
    }
    return data


})