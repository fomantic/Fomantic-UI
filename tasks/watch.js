/*******************************
 *          Watch Task
 *******************************/

var
  gulp      = require('gulp'),

  // node dependencies
  console   = require('better-console'),
  normalize = require('normalize-path'),

  // user config
  config    = require('./config/user'),

  // task config
  install   = require('./config/project/install'),

  // shorthand
  source    = config.paths.source,

  buildCSS  = require('./build/css')

;

// add tasks referenced using gulp.run (sub-tasks)
if (config.rtl) {
  require('./collections/rtl')(gulp);
}
require('./collections/internal')(gulp);

function watchCSS(full, incremental) {
  // Always execute a full build if config files are changed
  gulp.watch(
    [
      normalize(source.config)
    ],
    gulp.series(full)
  );

  gulp.watch(
    [
      normalize(source.definitions + '/**/*.less'),
      normalize(source.site + '/**/*.{overrides,variables}'),
      normalize(source.themes + '/**/*.{overrides,variables}')
    ],
    {ignoreInitial: false},
    gulp.series(incremental)
  );
}

// export task
module.exports = function (callback) {

  if (!install.isSetup()) {
    console.error('Cannot watch files. Run "gulp install" to set-up Semantic');
    return;
  }

  //console.clear();
  console.log('Watching source files for changes');
  /*--------------
      Watch CSS
  ---------------*/

  // check for right-to-left (RTL) language
  if (config.rtl === true || config.rtl === 'Yes') {
    watchCSS(buildCSS.rtl, buildCSS.incrementalRTL);
  } else if (config.rtl === 'both') {
    watchCSS(buildCSS.rtl, buildCSS.incrementalRTL);
    watchCSS(buildCSS, buildCSS.incremental);
  } else {
    watchCSS(buildCSS, buildCSS.incremental);
  }

  /*--------------
      Watch JS
  ---------------*/

  gulp.watch(
    normalize(source.definitions + '/**/*.js'),
    {ignoreInitial: false},
    gulp.series('build-javascript')
  );

  /*--------------
    Watch Assets
  ---------------*/

  // only copy assets that match component names (or their plural)
  gulp.watch(
    normalize(source.themes + '/**/assets/**/*.*'),
    {ignoreInitial: false},
    gulp.series('build-assets')
  );

};
