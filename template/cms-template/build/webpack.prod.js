const webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = () => merge(common, {
    mode: 'production',
    output: {
        publicPath: '/'
    },
    devtool: false,
    plugins: [
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"prod"'
        }),
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true
                    },
                    output: {
                        comments: false
                    }
                }
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }]
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?importLoader=1&modules&localIdentName=[local]-[hash:base64:6]',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    }
});
