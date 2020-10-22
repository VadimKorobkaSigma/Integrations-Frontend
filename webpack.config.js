const path = require('path');

module.exports = {
    entry: './src/app.js',
    devtool: 'sourcemaps',
    cache: false,
    mode: 'development',
    output: {
        publicPath: '/',
        path: path.resolve('build'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, './src')
    }
};