
    const checkLocalStorage={
        
      getData(storagename){
        if (!window.localStorage[storagename]) {
            const arr=[]
            return arr
        } else{
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
            var remain = Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24))+1;
            return remain ? remain : 0;
        }
    }
    export default checkLocalStorage
