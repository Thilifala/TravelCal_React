var webpack = require('webpack');

module.exports = {
  entry: [
  //react-hot配置
  // 'webpack-dev-server/client?http://localhost:3000', 
  // 'webpack/hot/only-dev-server', 
  //入口文件
  './src/js/index.js'
  ],
  output: {
    path: __dirname + 'assets/js',
    filename: 'bundle.js',
    publicPath:'/assets/' //生产环境下从该路径访问
  },
  module: {
    loaders: [
      {
        test: /\.(css|less)$/, 
        loader: 'style!css!postcss!less' //省略了-loader
      },
      {
        test:/\.jsx?$/,
        loader:'react-hot!babel'
      }
    ]
  },
  resolve:{
    extensions:['','.js','.json'] //import时自动添加后缀
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin() //react-hot配置
  ]
}