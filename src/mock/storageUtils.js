
    const checkLocalStorage={
        
      checkStorage(storagename){
        console.log("storagename======"+storagename)
        console.log(that)
        console.log(typeof(storagename))
        if (!localStorage[storagename]) {
            console.log('check')
            const arr=[]
            return arr
        } else{
            const content = JSON.parse(localStorage[storagename]);
            console.log(content)
            console.log(content[0])
            return content;
        }
        },
        today() {
            const now = new Date()
            return now.toLocaleDateString()
        }
    }
    export default checkLocalStorage
