import {
    saveAs
} from "file-saver";
export function today() {
    const now = new Date()
    return now.toLocaleDateString()
}
export function getData(storagename) { //object 为赋值对象
    if (!storagename) {
        storagename = "[]";
        return []
    } else if (JSON.parse(storagename).length > 0) {
        const content = JSON.parse(storagename);
        return content;
    }
}

export function plansSort(plans){
    const arr=[1,2,3,4]
    const new_plans=[]
    for(let i = 0;i<arr.length;i++){
        new_plans.push(plans.filter(item=>item.level==i))
    }  
}

export function randomId() {
    const mydate = new Date()
    return mydate.getTime()
}
export function numberHelper(string){
    const num = string-0
    if(parseInt(num)==num){
        //整数
        return num
    }else if(parseInt(num*100)<=num*100){  //102,102.5
        //2位小数
        return Math.round(num*100)/100
    }else if(parseInt(num*10)==num*10){ //11=11
        //1位小数
        return parseInt(num*10)/10
    }
}
export function remainDays(date) { //date 是未来的日期字符串，计算未来时期到今天的日期差
    const time1 = Date.parse(date);
    var time2 = Date.parse(new Date());
    var remain = Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24))+1;
    return remain ? remain : 0;
}
export function addRecord(plan_id, done) {
    var now = new Date()
    var today = now.toLocaleDateString()
    var obj = {}
    obj.plan_id = plan_id;
    obj.done = done;
    obj.finished_at = today;
    var records = []
    var add = 0
    if (localStorage.records) {
        records = getData(localStorage.records)
        for (var i = 0; i < records.length; i++) {
            if (records[i].finished_at == today && records[i].plan_id == plan_id) {
                records[i].done = Number(records[i].done) + Number(done);
                add = 1
            }
        }
        if (add == 0) {
            records.push(obj)
        }
    } else {
        records.push(obj)
    }

    localStorage.records = JSON.stringify(records)

}
export function saveStorage(dataObj, name) {
    var content = JSON.stringify(dataObj);
    var blob = new Blob([content], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, name + ".json");
}