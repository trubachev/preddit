const path = require("path")
const CompressionPlugin = require("compression-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const isProduction = process.env.NODE_ENV === "production"

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "src", "index.ejs")
  }),
  isProduction && new CompressionPlugin(),
  isProduction &&
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false
    })

].filter(Boolean)

const cssLoaders = [
  !isProduction && { loader: "style-loader" },
  isProduction && {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: "../"
    }
  },
  {
    loader: "css-loader",
    options: {
      modules: true
    }
  },
  {
    loader: "sass-loader"
  }
].filter(Boolean)

module.exports = {
  entry: path.resolve(__dirname, "src", "index.jsx"),
  output: {
    filename: "bundle.js",
    publicPath: "/",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css"],
    alias: {
      "~": path.resolve(__dirname, "src")
    }
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.(scss|css)$/,
        use: cssLoaders
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins,
  target: "web",
  mode: process.env.NODE_ENV || "production",
  devServer: {
    publicPath: "/",
    historyApiFallback: true
  }
}
