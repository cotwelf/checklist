import {
    saveAs
} from "file-saver";

export function addProject(obj) {
    const projects = JSON.parse(localStorage.projects)
    projects.push(obj)
    localStorage.projects = JSON.stringify(projects)
}

export function randomId() {
    const mydate = new Date()
    return mydate.getTime()
}

export function remainDays(date) { //date 是未来的日期，计算未来时期到今天的日期差
    const time1 = Date.parse(date);
    var time2 = Date.parse(new Date());
    var remain = Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24));
    return remain ? remain : 0;
}

export function addPlans(obj) {
    const plans = JSON.parse(localStorage.plans)
    plans.push(obj)
    localStorage.plans = JSON.stringify(plans)
}

export function saveStorage(dataObj, name) {
    var content = JSON.stringify(dataObj);
    var blob = new Blob([content], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, name + ".json");
}