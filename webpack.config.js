const path = require('path'),
  pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.ts$/,
        exclude: [/\.(spec|e2e)\.ts$/],
        loader: 'baggage?[file].html&[file].tpl.html&[file].css&[file].scss'
      }
    ],
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, exclude: [/\.(spec|e2e)\.tsx?$/], loader: 'ts' },
      {
        test: /\.html$/,
        loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname)) + '/app/!html'
      },
      { test: /\.css$/, loader: 'style!css' },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'autoprefixer', 'sass']
      },
      { test: /\.png$/, loader: 'url?limit=100000' },
      { test: /\.jpg$/, loader: 'file' },
      { test: /\.(ttf|woff|woff2|eot)$/, loader: 'file' },
    ]
  },
  // context: __dirname,
  entry: './app/app.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      pkg: pkg,
      template: './app/index.ejs'
    })
  ]
}
