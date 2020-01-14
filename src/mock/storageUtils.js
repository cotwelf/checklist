
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
        }
    }
    export default checkLocalStorage
