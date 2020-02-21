import request from '@/utils/request'
import {
    remainDays,
    addRecord,
    getData,
    updatePlan,
    today
} from "@/utils/data.js";
export default {

    getList(pid,plan_id) {
        // switch：Mock       
        const req = request({
            method: 'get',
            url: '/api/getplans',
            data: {
                pid,
                plan_id               
            }
        })
        return req
    },
    updatePlan(data, value) {
        const req = request({
            method: 'post',
            url: '/api/update_plan',
            data: {
                plan: {
                    id: data.id,
                    ver: data.ver,
                    name: data.name,
                    created_at: data.created_at,
                    end_at: data.end_at,
                    total: data.total,
                    per: data.per,
                    unit: data.planunit,
                    level: data.planlevel,
                    type: data.plantype,
                    pid: data.pid,
                    status: data.status,
                    done: data.done,
                    today_done: data.today_done | '',
                    per_now: data.per_now | data.per
                }, update_value: JSON.stringify(value),
            }
        })
        return req
    },
    closePlan(plan_id){
        const req = request({
            method:'post',
            url:'/api/close_plan',
            data:plan_id
        })
        return req
    },

}