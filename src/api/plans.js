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
                // status:0,               
            }
        })
        return req
    },
    updatePlan(data){
        console.log('66666666')
        const req = request({
            method:'post',
            url:'/api/update_plan',
            data:{
                id:data.id,
                ver:data.planver,
                name: data.planname,
                created_at:data.created_at,
                end_at:data.end_at,
                total:data.plantotal,
                per:data.per,
                unit:data.planunit,
                level:'',
                type:data.plantype,
                pid:data.pid,
                status:data.status,
                done:data.done,
            }
        })
        return req
    },

}