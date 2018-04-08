const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    entry: {
        // 'webpack-dev-server/client?https://0.0.0.0:3443',
        // 'webpack/hot/only-dev-server',
        app: './src/app.js'
    },
    watch: true,
    externals: [nodeExternals({
        whitelist: ['webpack/hot/only-dev-server']
    })],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './build',
        port: 3443,
        https: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new HtmlWebpackPlugin({
        //     title: 'Development'
        // })
    ],
    output: {
        publicPath: '/'
    }
});