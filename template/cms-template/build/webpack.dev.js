const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = () => {
    const configFilePath = path.join(__dirname, '../dev-server-proxy.json');
    let config = {};

    if (fs.existsSync(configFilePath)) {
        // eslint-disable-next-line
        config = require(configFilePath);
    }

    // eslint-disable-next-line no-console
    console.log(`\ndevServer proxy: ${JSON.stringify(config, null, ' ')}\n`);

    return merge(common, {
        mode: 'development',
        devtool: 'inline-source-map',
        output: {
            publicPath: '/',
            filename: '[name].js'
        },
        devServer: {
            host: '0.0.0.0',
            port: 9001,
            hot: true,
            overlay: true,
            historyApiFallback: true,
            publicPath: '/',
            contentBase: '../dist',
            disableHostCheck: true,
            proxy: {
                '/monitor/api/**': {
                    secure: false,
                    changeOrigin: true,
                    ...config
                }
            }
        },
        plugins: [new webpack.HotModuleReplacementPlugin()],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            },
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    exclude: /node_modules/,
                    use: [
                        'style-loader',
                        'css-loader?importLoader=1&modules&localIdentName=[local]-[hash:base64:6]',
                        'less-loader'
                    ]
                },
            ]
        }
    });
};
