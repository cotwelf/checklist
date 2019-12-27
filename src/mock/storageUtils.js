
    const checkLocalStorage={
      getData(storagename){
            if (!storagename) {
                storagename = "[]";
                return ''
            } else if (JSON.parse(storagename).length > 0) {
                const content = JSON.parse(storagename);
                return content;
            }
        },
        today() {
            const now = new Date()
            return now.toLocaleDateString()
        }
    }
    export default checkLocalStorage
