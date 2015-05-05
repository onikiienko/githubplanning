/*global module*/
module.exports = function(config) {
  config.set({
    basePath: '',

    // "requirejs" must come before "chai" or Chai will not load properly.
    // Sidenote: Karma loads the listed frameworks backwards.
    frameworks: ['mocha', 'requirejs', 'chai' ],

    // Contrary to what a few stackoverflow and github issue responses
    // suggested, the order of files do not appear to matter at all.
    files: [
      'build/**/tests/testRunner.js',

      // app files
      {pattern: 'build/**/*.html', included: false},
      {pattern: 'build/**/*.map', included: false},
      {pattern: 'build/**/*.js', included: false},
    ],

    // exclude: [
    //     'app/js/config.js',
    //     'app/js/main.js'
    // ],

    preprocessors: {},

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false
  });
};
