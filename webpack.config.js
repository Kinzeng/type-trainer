
var path = require('path')
var webpack = require('webpack')

var BUILD_DIR = path.resolve(__dirname, 'app/public/build')
var APP_DIR = path.resolve(__dirname, 'app/client')

var config = {
  stats: {
    assets: false,
    chunkModules: false,
    version: false,
    hash: false,
    timings: false,
    modules: false
  },
  entry: [
    'babel-polyfill',
    path.join(APP_DIR, 'index.js')],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: 'http://localhost:3001/'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: APP_DIR,
        loaders: ['babel']
      },
      {
        test: /\.css$/,
        loader: 'style-loader!'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ]
}

module.exports = config
