/*

  This file is only for tests - not for app. 

*/
const path = require('path');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const autoprefixer = require('autoprefixer');
//const postcssUrl = require('postcss-url');

const {NoEmitOnErrorsPlugin, LoaderOptionsPlugin, ContextReplacementPlugin, DefinePlugin} = require('webpack');
const {GlobCopyWebpackPlugin} = require('copy-globs-webpack-plugin');
//const {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin');
const {CommonsChunkPlugin} = require('webpack').optimize;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeModules = path.join(process.cwd(), 'node_modules');
const entryPoints = ["test"];

module.exports = {
  "devtool": "source-map",
  "resolveLoader": {
    "modules": [
      "./test",
      "./node_modules"
    ]
  },
  "entry": {
    "main": [
      "./test/test.index.ts"
    ]
  },
  "output": {
    "path": path.join(process.cwd(), "test"),
    "filename": "[name].test.bundle.js",
    "chunkFilename": "[id].test.chunk.js"
  },
  "module": {
    "rules": [
      {
        test: /\.ts?$/,
        use: [{
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: '../tsconfig.json'
            }
          }
        ]
      }
    ]
  },
  "plugins": [
    new ProgressPlugin(),
  ],
  "node": {
    "fs": "empty",
    "global": true,
    "crypto": "empty",
    "tls": "empty",
    "net": "empty",
    "process": true,
    "module": false,
    "clearImmediate": false,
    "setImmediate": false
  }
};

