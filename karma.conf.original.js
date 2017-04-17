// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html
var testWebpackConfig = require('./webpack.config.test.js')({ env: 'test' });

module.exports = function (config) {

  var configuration = {
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: './spec.bundle.js', watched: false },
      { pattern: './src/assets/**/*', watched: false, included: false, served: true, nocache: false }
    ],
    preprocessors: { './spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },
    webpack: testWebpackConfig,
    coverageReporter: {
      type: 'in-memory'
    },
    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html'
    },
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i.e.
      noInfo: true,
      // and use stats to turn off verbose output
      stats: {
        // options i.e. 
        chunks: false
      }
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true
  };
  config.set(configuration);
};
