// 权限校验：
// Vue Router中的前置钩子函数 beforeEach(to, from, next)
// 当进行路由跳转之前，进行判断是否登录，若未登录返回登录页
// to：即将要进入的目标路由对象
// from：即将离开的路由对象
// next：是个方法，可以制定路由地址，进行路由跳转

import router from './router'
import {getUserInfo} from './api/login'
import store from './store'
router.beforeEach((to, from, next) =>{
    //1.获取token
    // const token = localStorage.getItem('token')
    const token = store.state.user.token
    //1.1.如果没有获取到token
    if(!token){
        // 禁止访问非登录页，转跳登录页
        if(to.path !== '/login'){
            next({path: '/login'})
        }else{
            //请求登录页 /login
            next()
        }
    }else{
        //1.2.获取到token
        //1.2.1.请求路由/login,就去目标路由
        if(to.path === '/login'){
            //本地获取到，则让它去目标路由
            next()
        }else{
            //1.2.2.请求路由非登录页，先在本地查看是否有用户信息
            getUserInfo(token).then(response =>{
                const res = response.data
                // 有用户信息，保存到本地，去往目的路由，否则重新登录
                if(res.flag){
                    localStorage.setItem('token',JSON.stringify(res.data))
                    next()
                }else{
                    //如果没有用户信息，就通过token去获取
                    store.dispatch('GetUserInfo').then(response =>{
                        if(response.flag){
                            next()
                        }else{
                            next({pach:'/login'})
                        }
                    }).catch(error =>{
                        
                    })
                }
            })
        }
    }
})