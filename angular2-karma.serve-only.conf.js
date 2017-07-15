/**
 * @author: @AngularClass
 */

module.exports = function (config) {
  var testWebpackConfig = require('./angular2-webpack-starter.test.js')({ env: 'test' });

  var configuration = {

    // base path that will be used to resolve all patterns (e.g. files, exclude)
    basePath: '',

    /*
     * Frameworks to use
     *
     * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: ['jasmine'],

    // list of files to exclude
    exclude: [],

    client: {
      captureConsole: true
    },

    /*
     * list of files / patterns to load in the browser
     *
     * we are building the test environment in ./spec-bundle.js
     */
    files: [
      { pattern: './angular2-spec-bundle.js', watched: true },
      { pattern: './src/assets/**/*', watched: true, included: false, served: true, nocache: false }
    ],

    /*
     * By default all assets are served at http://localhost:[PORT]/base/
     */
    proxies: {
      "/assets/": "/base/src/assets/"
    },

    /*
     * preprocess matching files before serving them to the browser
     * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: { './angular2-spec-bundle.js': ['webpack', 'sourcemap'] },

    // Webpack Config at ./webpack.test.js
    webpack: testWebpackConfig,

    // Webpack please don't spam the console when running in karma!
    //webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i.e.
      //noInfo: true,
      // and use stats to turn off verbose output
      //stats: {
        // options i.e. 
        //chunks: false
      //}
    //},
    reporters: ['progress','kjhtml'],
    autowatch: true,
    singleRun: false,
    client: {
      //builtPaths: ['app/'], // add more spec base paths as needed
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    onPrepare: function() {
        jasmine.getEnv().addReporter(
          new Jasmine2HtmlReporter({
            savePath: './test-output/screenshots',
            takeScreenshots: true,
            takeScreenshotsOnlyOnFailures: true,
            screenshotsFolder: 'images'
          })
        );
    },

    // HtmlReporter configuration
    htmlReporter: {
      // Open this file to see results in browser
      outputFile: '_test-output/tests.html',
 
      // Optional
      pageTitle: 'Unit Tests',
      subPageTitle: __dirname
    },

    // web server port
    port: 3005,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    /*
     * level of logging
     * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_WARN,

    /*
     * start these browsers
     * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: [
      'Chrome'
    ],

    /*
     * Continuous Integration mode
     * if true, Karma captures browsers, runs the tests and exits
     */
    mime: {
      'text/x-typescript': ['ts','tsx']
    },

  };


  config.set(configuration);
};