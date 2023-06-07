const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // development mode
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js'), // allows code splitting if multiple entries
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js', // same as entry point key
    clean: true, // clean dist folder before build
    assetModuleFilename: '[name][ext]',
  },
  devtool: 'source-map', // source map
  devServer: {
    // development server
    static: {
      directory: path.join(__dirname, 'dist'), // serve the dist folder
    },
    open: true, // open browser
    hot: true, // enable hot module replacement
    compress: true, // enable gzip compression
    historyApiFallback: true, // enable HTML5 history API fallback
  },
  module: {
    // loaders
    rules: [
      {
        test: /\.scss$/, // for scss files
        use: ['style-loader', 'css-loader', 'sass-loader'], // loader for scss files
      },
      {
        test: /\.js$/, // for js files (supports for older browsers)
        exclude: /node_modules/, // exclude node_modules
        use: {
          loader: 'babel-loader', // loader for js files
          options: {
            presets: ['@babel/preset-env'], // babel preset
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // for image files
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    // plugins
    new HTMLWebpackPlugin({
      // html plugin
      title: 'Webpack App', // title of the app
      filename: 'index.html', // output file name
      template: path.resolve(__dirname, 'src/template.html'), // html template file
    }),
  ],
};
