const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

function resolve(dir)
{
    return path.join(__dirname, "..", dir);
}

module.exports =
{
    resolve:
    {
        extensions: [".js", ".vue", ".json", ".ts"],
        alias:
        {
            "vue$": "vue/dist/vue.esm.js",
            "src": resolve("src"),
            "config": resolve("src/config"),
            "models": resolve("src/models"),
            "common": resolve("src/common"),
            "mixins": resolve("src/mixins"),
            "components": resolve("src/components")
        }
    },
    module:
    {
        rules:
        [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                enforce: "pre",
                loader: "tslint-loader"
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                // exclude: /node_modules/,
                include: [resolve("src"), resolve("node_modules/uppercamelcase"), resolve("node_modules/camelcase"), resolve("test")]
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options:
                {
                    loaders:
                    {
                        css: "vue-style-loader!css-loader",
                        less: "vue-style-loader!css-loader!less-loader"
                    },
                    postLoaders:
                    {
                        html: "babel-loader"
                    }
                }
            },
            {
                test: /\.css$/,
                use:
                [
                    "style-loader",
                    "css-loader"
                ]
            },
            // {
            //     test: /\.less$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: ["css-loader", "less-loader"]
            //     })
            // },
            {
                test: /\.less$/,
                use:
                [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.scss$/,
                use:
                [
                    "style-loader",
                    "css-loader",
                    "sass-loader?sourceMap"
                ]
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: "url-loader?limit=8192"
            },
            {
                test: /\.(html|tpl)$/,
                loader: "raw-loader"
            }
        ]
    },
    plugins:
    [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.WatchIgnorePlugin([/\.d\.ts$/]),
        new ForkTsCheckerWebpackPlugin
        ({
            tslint: true,
            vue: true
        })
    ]
};