module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:8080'
            },

        }
    },
    lintOnSave: process.env.NODE_ENV === 'production'
}