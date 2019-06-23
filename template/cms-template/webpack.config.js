const testConfig = require('./build/webpack.test');
const prodConfig = require('./build/webpack.prod');
const devConfig = require('./build/webpack.dev');

module.exports = (env = {}) => {
    const id =  env.id || '';
    let config;

    if (env.test) {
        config = testConfig(id);
    } else if (env.prod || env.analyzer) {
        config = prodConfig(id);
    } else {
        config = devConfig(id);
    }

    return config;
};
