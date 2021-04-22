const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const defaultConfig = {
  mode: "production",
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: "[name].js",
    chunkFilename: '[name].bundle.js',
    libraryTarget: "umd", //发布组件专用
    library: "HTool",
    path: path.resolve(__dirname, "../lib"),
    clean: true
  },
  //   devtool: "inline-source-map",//避免在生产中使用 inline-*** 和 eval-***，因为它们会增加 bundle 体积大小，并降低整体性能。
  devtool: "source-map",
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
            loader: MiniCssExtractPlugin.loader //MiniCssExtractPlugin CSS代码分离
          },
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
    new MiniCssExtractPlugin(),
    // new webpack.DllPlugin({
    //   format: true,
    //   path: path.join(__dirname, 'dist/dll', '[name].manifest.json')
    // })
  ],
  optimization: {
    //优化 解决压缩后有txt listen文件
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true
      }),
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false
          }
        },
        extractComments: false
      })
    ],
    //代码分离
    // runtimeChunk: 'single',
    // splitChunks: {
    //   chunks: "all",
    //   name: "chunkst"
    // }
  },
  performance: {
    //性能
    hints: "warning",
    maxEntrypointSize: 2048000, //2M
    maxAssetSize: 2048000
  }
};

module.exports = defaultConfig;
