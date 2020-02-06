import request from '@/utils/request'
import {
    remainDays,
    addRecord,
    getData,
    updatePlan,
    today
} from "@/utils/data.js";
export default {

    getList(pid) {
        // switch：Mock       
        const req = request({
            method: 'get',
            url: '/api/getplans',
            data: {
                pid,               
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
                    today_done: data.today_done | '',
                    per_now: data.per_now | data.per
                }, update_value: JSON.stringify(value),
            }
        })
        return req
    },

}