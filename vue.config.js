module.exports = {
    publicPath: './',
    devServer: {
        open: true,
    
        proxy: {
            '^/api': {
                target: 'http://xiu.moonrailgun.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },

        }
    },
    lintOnSave: process.env.NODE_ENV === 'production'
}