const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getAbsolutePath = p => path.resolve(__dirname, p);

module.exports = {
    entry: {
        app: getAbsolutePath('../src/index.js')
    },
    output: {
        hashDigestLength: 8,
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:5].chunk.js',
        path: getAbsolutePath('../dist')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': getAbsolutePath('../src'),
            lodash: 'lodash-es'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: getAbsolutePath('../src/index.html'),
            filename: getAbsolutePath('../dist/index.html'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                include: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            modifyVars: {
                                'font-size-base': '12px',
                                'table-padding-horizontal': '8px'
                            },
                        },
                    },
                ],
            },
        ]
    }
};
