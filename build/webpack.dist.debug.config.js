const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config");

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
        filename: "flagwind-amap.js",
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
        minimize: false
    }
});
