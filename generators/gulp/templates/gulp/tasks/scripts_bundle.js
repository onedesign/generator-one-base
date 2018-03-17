const config = require('../config');
const gulp = require('gulp');
const _ = require('lodash');
const path = require('path');
const stripAnsi = require('strip-ansi');
const webpack = require('webpack');
const util = require('util');

//
//   Scripts : Bundle
//
//////////////////////////////////////////////////////////////////////

/*
Bundles javascript files.
*/

gulp.task('scripts:bundle', function(callback) {
  //---------------------------------------------------------------
  // Plugins
  //---------------------------------------------------------------
  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.bundle.js'
    }),

    // Give all modules access to jQuery
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),

    // Get the current environment
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ];

  // Add uglification in production
  if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        comparisons: false
      }
    }));
  }


  //---------------------------------------------------------------
  // Config
  //---------------------------------------------------------------

  const webpackConfig = {
    entry: _.reduce(config.scripts.entryFiles, function(result, name) {
      result[name] = path.resolve('./' + config.paths.scriptSrc + name);
      return result;
    }, {}),

    output: {
      path: path.resolve('./' + config.paths.scriptDist),
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
          options: { presets: [
            ['env', {
              'targets': {
                'browsers': ['> 1%', 'last 2 versions']
              }
            }],
            'react'
          ] },
          exclude: [/node_modules/]
        }
      ]
    },

    plugins: plugins
  };


  //---------------------------------------------------------------
  // Webpack
  //---------------------------------------------------------------

  webpack(webpackConfig, function(err, stats) {
    const log = function(stats) {
      util.log('[webpack]', stats.toString({
        chunks: false,
        colors: true,
        version: false,
        hash: false,
        maxModules: 50,
        modulesSort: '!size'
      }));
    };

    if (err) throw new util.PluginError('webpack', err);

    if (stats.hasErrors()) {
      const info = stats.toJson('errors-only');
      const body = stripAnsi(info.errors.join('/n'));
      global.browserSync.notify(body, 30000);
    } else {
      global.browserSync.reload({ once: true });
    }
    log(stats);
    callback();
  });
});
