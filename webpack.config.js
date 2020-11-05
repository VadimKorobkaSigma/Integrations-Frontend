const path = require('path');

module.exports = {
    entry: './src/app.js',
    devtool: 'source-map',
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
        },
        proxy:{
            '/api': {
                target: 'http://localhost:8080',
                pathRewrite: {'^/api' : ''}
            }
        }
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            // '.js' is added to support JSX expressions in .js files.
            { test: /\.(tsx?|js)$/, loader: "ts-loader", exclude: /(node_modules)/ },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader", exclude: /(node_modules)/ },

            {
                test: /\.css$/,
                include: path.join(__dirname, './src/assets'),
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    }
};