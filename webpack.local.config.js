/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge')
const common = require('./webpack.common.config.js')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'web',
    output: {
        publicPath: '/'
    },
    devServer: {
        publicPath: '/',
        hot: true,
        port: 3002,
        historyApiFallback: true
    }
})
