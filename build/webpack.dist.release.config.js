const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(webpackBaseConfig,
{
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
    plugins: 
    [
        new webpack.DefinePlugin
        ({
            "process.env":
            {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin
        ({
            output:
            {
                comments: false
            },
            compress: 
            {
                warnings: false
            }
        }),
        new ExtractTextPlugin({filename: path.resolve(__dirname, "flagwind-amap.css"), allChunks: true}),

    ]
});
