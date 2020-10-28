const Dotenv = require('dotenv-webpack');
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
        contentBase: path.join(__dirname, './src'),
        historyApiFallback: true,
        port: 3000,
        watchOptions: {
            poll: 1000
        }
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-react", "@babel/preset-env"]
                    }
                }]
            }
        ]
    },
    plugins: [
        new Dotenv()
    ]
};