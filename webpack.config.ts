import * as webpack from 'webpack';
// just in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config: webpack.Configuration = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [new MiniCssExtractPlugin()],
};

export default config;