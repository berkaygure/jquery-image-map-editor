const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: {
        bundle: __dirname + "/src/jquery-image-map-editor.js"
    },
    devtool: "source-map",
    output: {
        path: __dirname + "/dist",
        filename: "jquery-image-map-editor.min.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './dist/index.html',
            filename: 'index.html',
            hash: true
        })
    ],
    devServer: {
        stats: {
            color: true,
            children: false,
            maxModules: 0
        }
    },
    watch: true,
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    }
};