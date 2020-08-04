const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


let entries = [
    { pageName: "TestPage" },
];

const pluginsOptions = [];
entries.forEach(e => {
    pluginsOptions.push(
        new HtmlWebpackPlugin({
            filename: `./${e.pageName}.html`,
            template: `./src/pages/${e.pageName}.pug`,
            inject: true,
            chunks: [e.pageName],
        })
    )
});
pluginsOptions.push(new MiniCssExtractPlugin({
    filename: '[name].css',
}));
pluginsOptions.push(new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
}));

let entryObj = {};
entryObj.plugin = "./src/plugin.ts";
entryObj.TestPage = "./src/pages/TestPage.ts";
module.exports = {
    entry: entryObj,

    output: {
        path: path.resolve(__dirname, 'bandle'),
        filename: '[name].js?v=[hash]'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    plugins: pluginsOptions,

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
            },
            {
                test: /\.pug$/,
                loaders: [
                    {
                        loader: "pug-loader"
                    },
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg|png|jpg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                }
            },
            {
                test: /\.css$/,
                loaders: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                ]
            },
            {
                test: /\.scss$/,
                loaders: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader"
                    },
                ]
            },
        ]
    },
}