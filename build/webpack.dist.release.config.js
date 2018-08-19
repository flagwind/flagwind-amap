const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(webpackBaseConfig,
{
    mode: 'production',
    entry:
    {
        main: "./src/index.ts"
    },
    output:
    {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/dist/",
        filename: "flagwind-amap.min.js",
        library: "flagwind-amap",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    externals: 
    {
        "vue": "vue",
        "vue-router": "vue-router",
        "vuex": "vuex",
        "flagwind-core": "flagwind-core",
        "flagwind-web": "flagwind-web"
    },
    optimization:
    {
        minimizer:
        [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: false // set to true if you want JS source maps
          })
        ]
    }
});
