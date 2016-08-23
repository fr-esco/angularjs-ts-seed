const path = require('path');

module.exports = {
  module: {
    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.ts$/,
        loader: 'baggage?[file].html&[file].tpl.html&[file].css&[file].scss'
      }
    ],
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.html$/,
        loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname)) + '/app/!html'
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file-loader' },
      { test: /\.ttf$/, loader: 'file-loader' },
      { test: /\.woff$/, loader: 'file-loader' },
      { test: /\.woff2$/, loader: 'file-loader' },
      { test: /\.eot$/, loader: 'file-loader' },
      // {
      //   test: /\.js?$/,
      //   exclude: /(node_modules|bower_components)/,
      //   loader: 'babel', // 'babel-loader' is also a legal name to reference
      //   query: {
      //     presets: ['es2015'],
      //     cacheDirectory: true
      //   }
      // }
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
}
