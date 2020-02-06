import request from '@/utils/request'
import {
    remainDays,
    addRecord,
    getData,
    updatePlan,
    today
} from "@/utils/data.js";
export default {

    getList() {
        // switch：Mock       

        const req = request({
            method: 'get',
            url: '/api/getplans',
            data: {
                // status:0,               
            }
        })
        return req
    },
    updatePlan(data, value) {
        console.log('planapi_updatePlan')
        console.log(data)
        console.log(value)
        const req = request({
            method: 'post',
            url: '/api/update_plan',
            data: {
                id: data.id,
                ver: data.planver,
                name: data.planname,
                created_at: data.created_at,
                end_at: data.end_at,
                total: data.plantotal,
                per: data.per,
                unit: data.planunit,
                level: data.planlevel,
                type: data.plantype,
                pid: data.pid,
                status: data.status,
                done: data.done,
                update_value: value | '',
                update_time: data.update_time | '',
                today_done: data.today_done | '',
                per_now: data.per_now | ''
            }
        })
        return req
    },

}