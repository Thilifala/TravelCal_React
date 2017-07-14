const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
  //react-hot配置
  // 'webpack-dev-server/client?http://localhost:3000', 
  // 'webpack/hot/only-dev-server', 
  //入口文件
  './app/script/index.js'
  ],
  output: {
    path: path.resolve(__dirname , 'build'),
    filename: 'bundle.js',
    publicPath:'/build/' //生产环境下从该路径访问
  },
  module: {
    rules:[
      {
        test: /\.(css|less)$/, 
        include:[
          path.resolve(__dirname,"app")
        ],
        loader: 'style-loader!css-loader!postcss-loader!less-loader' //省略了-loader
      },
      {
        test:/\.jsx?$/,
        include:[
          path.resolve(__dirname,"app")
        ],
        loader:'babel-loader',
        options:{
          "presets":["react","es2015"]
        }
      }
    ]
  },
  resolve:{
    extensions:['.js','.json','.jsx',".css"] //import时自动添加后缀
  }
  ,
  plugins:[
    new webpack.HotModuleReplacementPlugin() //react-hot配置
  ]
}