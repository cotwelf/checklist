import axios from 'axios'
const request = axios.create({
    baseURL:'/',
    timeout:5000
})
//请求拦截
request.interceptors.request.use(config =>{
    // 判断用户是否登录
 return config
}, error =>{
    return Promise.reject(error)

})
request.interceptors.response.use(response =>{
    return response
},error =>{
 return Promise.reject(error)
})

export default request