import images from '@/assets/img/index'
const global = {
    state: {
        theme_all: [{ color: 'grey700', bgi: images.grey }, { color: 'pink200', bgi: images.pink }, { color: 'blue200', bgi: images.blue },],
        theme: { color: 'grey700', bgi: images.grey },
    },
    mutations: {
        CHANGE_THEME: (state, new_theme) => {
            state.theme = new_theme
        }
    }
}

export default global