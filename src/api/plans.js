import request from '@/utils/request'
import {
    remainDays,
    addRecord,
    getData,
    updatePlan,
    today
  } from "@/utils/data.js";
export default{

    getList(){
        // switch：Mock       

        const req = request({
            method:'get',
            url:'/api/getplans',
            data:{
                status:0,               
            }
        })
        return req
    },
    createPlan(data){
        console.log(data)
        const req = request({
            method:'post',
            url:'/api/create-plan',
            data
        })
    },

}