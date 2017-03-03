const path                     = require('path');
const webpack                  = require('webpack');
const CommonsChunkPlugin       = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const DefinePlugin             = require('webpack/lib/DefinePlugin');
const CopyWebpackPlugin        = require('copy-webpack-plugin');

const ENV  = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const metadata = {
  env : ENV,
  host: HOST,
  port: PORT
};

module.exports = {
  devServer: {
    contentBase: 'src',
    historyApiFallback: true,
    host: metadata.host,
    port: metadata.port
  },
  devtool: 'source-map',
  entry: {
    'main'  : './src/main.ts',
    'vendor': './src/vendor.ts'
  },
  module: {
    loaders: [
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.css$/,  loader: 'raw-loader', exclude: /node_modules/},
      {test: /\.css$/,  loader: 'style!css-loader?-minimize', exclude: /src/},
      {test: /\.html$/, loader: 'raw-loader'},
      {test: /\.ts$/,   loaders: [
        {loader: 'ts-loader', query: {compilerOptions: {noEmit: false}}},
        {loader: 'angular2-template-loader'}
      ]}
    ]
  },
  output: {
    path    : path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js', minChunks: Infinity}),
    new DefinePlugin({'webpack': {'ENV': JSON.stringify(metadata.env)}}),
    new CopyWebpackPlugin([{from: './src/index.html', to: 'index.html'}]),
    new CopyWebpackPlugin([{from: './src/app/config/config.json', to: 'config.json'}]),
    new CopyWebpackPlugin([{from: './src/styles.css', to: 'styles.css'}]),
    new ContextReplacementPlugin(
      // needed as a workaround for the Angular's internal use System.import()
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      path.join(__dirname, 'src') // location of your src
    ), new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
  ],
  resolve: {
    alias: {
        jquery: "jquery/src/jquery"
    },
    extensions: ['.ts', '.js', '.json']
  }
};