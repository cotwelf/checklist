const Mock = require('mockjs')
import storageUtils from '@/mock/storageUtils'
Mock.mock('/api/getprojects',(req,res)=>{
    
    const data = storageUtils.getData("projects");
    const obj = JSON.parse(req.body)
    if(obj){
        var project = {}
        const len = data.length
       for(var i=0;i<len;i++){
           const index=i
           if(data[index].id==obj.id){
               project = data[index]
               return project
           }
       }
    }
    const projects= {
        dead:[],
        alive:[]
      }
    data.filter(item =>{
        if(Date.parse(new Date())>Date.parse(item.end_at)){
          // dead
      projects.dead.push(item)
        }else{
          projects.alive.push(item)
        }
      })
    return projects
})