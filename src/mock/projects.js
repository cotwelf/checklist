const Mock = require('mockjs')

Mock.mock('/api/getprojects',(req,res)=>{
    
    const data = localStorage.projects?JSON.parse(localStorage.projects):'';
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
    return data
})