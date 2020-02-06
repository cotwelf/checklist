
const checkLocalStorage = {

    getData(storagename) {
        if (!window.localStorage[storagename]) {
            const arr = []
            return arr
        } else {
            const content = JSON.parse(window.localStorage[storagename]);
            return content;
        }
    },
    today() {
        const now = new Date()
        return now.toLocaleDateString()
    },
    remainDays(date) { //date 是未来的日期字符串，计算未来时期到今天的日期差
        const time1 = Date.parse(date);
        var time2 = Date.parse(new Date());
        var remain = Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24)) + 1;
        return remain ? remain : 0;
    },
    plansSort(plans) {
        //设置优先级（高→低）
        const arr = [1, 2, 3, 4]
        let new_plans = []
        for (let i = 0; i < arr.length; i++) {
            new_plans = new_plans.concat(plans.filter(item => item.level == arr[i]))
        }
        return new_plans
    }
}
export default checkLocalStorage
