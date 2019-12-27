import request from '@/utils/request'
import {
    remainDays,
    addRecord,
    getData,
    updatePlan,
    today
  } from "@/utils/data.js";
export default{

    getProjects(){
        // switch：Mock

        const req = request({
            method:'get',
            url:'/api/getprojects',
            data:{
                status:0,               
            }
        })
        return req
    }
}