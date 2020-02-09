import images from '@/assets/img/index'
const global = {
    //存放状态
    state: {
        theme_all: [{ color: 'grey900', bgi: images.grey }, { color: 'pink200', bgi: images.pink }, { color: 'blue200', bgi: images.blue },],
        theme: { color: 'grey900', bgi: images.grey },
    },
    //定义改变state的方法
    mutations: {
        CHANGE_THEME: (state, new_theme) => {
            state.theme = new_theme
        }
    },
    actions:{
        changeTheme(index){
            index.commit('CHANGE_THEME',index)

        }
    }
}

export default global