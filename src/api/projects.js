import request from '@/utils/request'
import {
    remainDays,
    addRecord,
    getData,
    updatePlan,
    today
  } from "@/utils/data.js";
export default{

    getProjects(id){
        // switch：Mock

        const req = request({
            method:'get',
            url:'/api/getprojects',
            data:{
                status:0,
                id:id?id:''     
            }
        })
        return req
    },
    updateProject(data){
        const req = request({
            method:'post',
            url:'/api/update_project',
            data
        })
        return req
    }
}