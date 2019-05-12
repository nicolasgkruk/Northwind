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
};