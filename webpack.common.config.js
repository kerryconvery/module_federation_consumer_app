/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: '[name].[contenthash:8].js',
        clean: true
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'vendor'
        }
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'public', to: './' }
            ]
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: './src/index.html',
            filename: './index.html'
        }),
        new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }),
        new ModuleFederationPlugin({
            name: 'ssc',
            filename: 'remoteEntry.js',
            remotes: {
                amendments: 'amendments@http://localhost:3001/remoteEntry.js',
                supercart: 'supercart@http://localhost:8080/remoteEntry.js'
            },
            shared: [
                {
                    react: {
                        singleton: true,
                        eager: true,
                        requiredVersion: deps.react
                    },
                    'react-dom': {
                        singleton: true,
                        eager: true,
                        requiredVersion: deps['react-dom']
                    },
                }
            ]
        }),
    ]
}
