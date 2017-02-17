var config             = require('../config');
var gulp               = require('gulp');
var _                  = require('lodash');
var util               = require('gulp-util');
var path               = require('path');
var stripAnsi          = require('strip-ansi');
var webpack            = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

//
//   Scripts : Bundle
//
//////////////////////////////////////////////////////////////////////

/*
Bundles javascript files.
*/

gulp.task('scripts:bundle', ['scripts:lint'], function(callback) {
  var webpackConfig = {
    entry: _.reduce(config.scripts.entryFiles, function(result, name) {
      result[name] = './' + config.paths.scriptSrc + name;
      return result;
    }, {}),

    output: {
      path: './' + config.paths.scriptDist,
      filename: '[name].bundle.js'
    },

    resolve: {
      modules: [
        path.resolve('./node_modules'),
        path.resolve('./' + config.paths.scriptSrc + 'vendor')
      ],
      alias: config.scripts.aliases
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: { presets: ['es2015', 'stage-2', 'react'] },
          exclude: [/node_modules/]
        }
      ]
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'common.bundle.js',
      }),

      // Give all modules access to jQuery
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  }

  webpack(webpackConfig, function(err, stats) {
    var log = function(stats) {
      util.log('[webpack]', stats.toString({
        chunks: false,
        colors: true,
        version: false,
        hash: false
      }));
    }

    if (err) throw new util.PluginError('webpack', err);

    if (stats.hasErrors()) {
      var info = stats.toJson('errors-only');
      var body = stripAnsi(info.errors.join('/n'));
      global.browserSync.notify(body, 30000);
    } else {
      global.browserSync.reload({ once: true });
    }
    log(stats);
    callback();
  });
});
