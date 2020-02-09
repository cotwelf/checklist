module.exports = {
    publicPath: './',
    devServer: {  //开发环境
        open: true,
    
        proxy: {  //解决跨域问题，使用proxy代理
            '^/api': {  //如果访问的接口以/api开头，视为跨域请求，在此进行处理。如果放到env配置，需要加括号如[process.env.VUE_APP_BASE_API]
                target: process.env.VUE_APP_SERVICE_URL,  //目标服务器地址
                changeOrigin: true, //开启代理
                pathRewrite: {
                    //当请求/api/plan时会被转发给http://xiu.moonrailgun.com/plan
                    '^/api': '' //将/api替换为空
                }
            },

        }
    },
    lintOnSave: process.env.NODE_ENV === 'production'
}