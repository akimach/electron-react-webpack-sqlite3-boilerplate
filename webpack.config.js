const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const APP_DIR = path.join(__dirname, 'app');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    target: 'electron',
    node: {
      __dirname: false,
      __filename: false
    },
    entry: [
      path.join(SRC_DIR, 'index.js'),
    ],
    output: {
      path: APP_DIR,
      publicPath: '/',
      filename: 'bundle.js',
      libraryTarget: 'commonjs2',
    },
    module: {
      loaders: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }]
    },
    externals: [
        'electron',
        'fs',
        'sqlite3'
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devServer: {
      historyApiFallback: true,
      contentBase: APP_DIR,
    },
  },
  {
    entry: {
      style: './stylesheets/index.scss',
    },
    output: {
      path: APP_DIR,
      publicPath: '/',
      filename: 'bundle.css',
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('bundle.css'),
    ],
  },
];
