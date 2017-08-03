const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    //react-hot配置
    // 'webpack-dev-server/client?http://localhost:3000', 
    // 'webpack/hot/only-dev-server', 
    //入口文件
    './src/js/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'assets/js'),
    filename: 'bundle.js',
    publicPath: '/assets/' //生产环境下从该路径访问
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        loader: 'style-loader!css-loader!postcss-loader!less-loader' //省略了-loader
      },
      {
        test:/\.(jpg|png)$/,
         include: [
          path.resolve(__dirname, "src")
        ],
        loader:'url-loader?limit=8192' //限制8K
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        loader: 'babel-loader',
        options: {
          "presets": ["es2015","react"]
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', ".css"] //import时自动添加后缀
  }
  ,
  plugins: [
    new webpack.HotModuleReplacementPlugin() //react-hot配置
  ]
}