const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const path = require('path');
const { DefinePlugin } = require('webpack');

const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: true,
        modules: {
            localIdentName: '[local]__[hash:base64:5]',
        },
    },
};

const CSSLoader = {
    loader: 'css-loader',
    options: {
        modules: false,
        sourceMap: true,
    },
};

const sassLoader = {
    loader: 'sass-loader',
    // options: {
    //   additionalData: `@import "variables.scss";`,
    //   sassOptions: {
    //     includePaths: [path.resolve(rootDir, 'src', 'assets')],
    //   },
    // },
};

const isDev = process.env.BUILD_STAGE !== 'prod';
const API = {
    local: 'http://localhost:3000/api',
    dev: 'http://localhost:5438',
    prod: 'http://localhost:5438',
};
const API_URL = API[process.env.BUILD_STAGE] || API.dev;

module.exports = {
    entry: './src/app.js',
    devtool: isDev ? 'source-map' : '',
    mode: isDev ? 'development' : 'production',
    output: {
        publicPath: '/',
        path: path.resolve('build'),
        filename: '[name].[hash].js',
    },
    devServer: {
        contentBase: path.resolve('src'),
        historyApiFallback: true,
        port: 3000,
        open: true,
        https: true,
        watchOptions: {
            poll: 1000,
        },
        proxy: {
            '/api': {
                changeOrigin: true,
                target: 'http://localhost:5438',
                pathRewrite: { '^/api': '' },
            },
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                use: [
                    'cache-loader',
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            // disable type checker - we will use it in fork plugin
                            transpileOnly: true,
                            configFile: 'tsconfig.json',
                        },
                    },
                ],
                exclude: /(node_modules)/,
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: ['cache-loader', 'source-map-loader'],
            },
            // styles
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: ['cache-loader', 'style-loader', CSSLoader, sassLoader],
            },
            {
                test: /\.module\.scss$/,
                use: ['cache-loader', 'style-loader', CSSModuleLoader, sassLoader],
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: ['cache-loader', 'style-loader', CSSLoader],
            },
            {
                test: /\.module\.css$/,
                use: ['cache-loader', 'style-loader', CSSModuleLoader],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
        plugins: [new TsconfigPathsPlugin({ extensions: ['.ts', '.js', '.tsx', '.jsx'] })],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: 'all',
            minify: true,
            template: './src/index.html',
        }),
        new DefinePlugin({
            'process.env.API_URL': JSON.stringify(API_URL),
        }),
        new CleanWebpackPlugin(),
        // isDev && new ForkTsCheckerWebpackPlugin(),
        isDev && new webpack.HotModuleReplacementPlugin(),
        process.env.BUILD_STATS && new BundleAnalyzerPlugin(),
    ].filter(Boolean),
};
