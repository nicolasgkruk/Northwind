"use strict";
const path = require('path');
const bundleFileName = 'site';

module.exports = {
    mode: "development",
    entry: ['./src/es6.js'],
    output: {
        filename: bundleFileName + '.js',
        path: path.resolve(__dirname, 'wwwroot/js'),
        library: 'site',
        libraryTarget: 'var',
    },
    //module: {
    //    rules: [{
    //        test: /\.scss$/,
    //        use: [
    //            {
    //                loader: 'file-loader',
    //                options: {
    //                    name: bundleFileName + '.css'
    //                }
    //            },
    //            {
    //                loader: 'extract-loader'
    //            },
    //            {
    //                loader: "css-loader",
    //                options: {
    //                    minimize: true || {/* or CSSNano Options */ }
    //                }
    //            },
    //            {
    //                loader: "sass-loader"
    //            }
    //        ]
    //    }]
    //}
};