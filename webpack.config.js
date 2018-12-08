const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: "./src/js/index.js",
    winInit: "./src/js/winInit.js"
  },
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/i,
        use: ["url-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "../index.html",
      title: "我的梦-张靓颖",
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      inject: false,
      chunks: ["index", "winInit"]
    }),
    new webpack.HotModuleReplacementPlugin()
    /* new ExtractTextPlugin("css/index.css") */
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    host: "localhost",
    port: "8090",
    open: true,
    hot: true
  }
};