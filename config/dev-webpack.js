const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  mode: "development",
  entry: "./Test/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "../dist")
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
    stats: {
      colors: true
    }
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "../src/")
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/, // jsx/js文件的正则
        exclude: /node_modules/, // 排除 node_modules 文件夹
        use: {
          // loader 是 babel
          loader: "babel-loader",
          options: {
            // babel 转义的配置选项
            babelrc: false,
            presets: [
              // 添加 preset-react
              [require.resolve("@babel/preset-env"), { modules: false }],
              require.resolve("@babel/preset-react")
            ],
            plugins: [
              require.resolve("@babel/plugin-transform-runtime"),
              require.resolve("@babel/plugin-proposal-class-properties")
            ],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          //   {
          //     loader: "style-loader"
          //   },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "hqw_[name]_[hash:base64:5]",
                namedExport: false
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: true
    }),
    new MiniCssExtractPlugin()
  ]
};
module.exports = config;
