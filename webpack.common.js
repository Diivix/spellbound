const webpack = require('webpack');
const path = require('path');
// const StartServerPlugin = require('start-server-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: [
        './src/app'
    ],
    target: 'node',
    module: {
        rules: [{
            test: /\.js?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new CleanWebpackPlugin(['build']),
        new Dotenv({
            safe: true,
            systemvars: true
        })
        // new StartServerPlugin('server.js')
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'server.js'
    }
}