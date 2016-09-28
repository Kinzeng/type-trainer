
var path = require('path')
var webpack = require('webpack')
var config = require('./config')

var BUILD_DIR = path.resolve(__dirname, 'app', 'public', 'build')
var APP_DIR = path.resolve(__dirname, 'app', 'client')

module.exports = {
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
    path.join(APP_DIR, 'index.js')
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: config.host + ':' + config.port
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
