/*******************************
 *           Set-up
 *******************************/

var
  gulp        = require('gulp-help')(require('gulp')),

  // read user config to know what task to load
  config      = require('./tasks/config/user'),

  // watch changes
  watch       = require('./tasks/watch'),

  // build all files
  build       = require('./tasks/build'),
  buildJS     = require('./tasks/build/javascript'),
  buildCSS    = require('./tasks/build/css'),
  buildAssets = require('./tasks/build/assets'),

  // utility
  clean       = require('./tasks/clean'),
  version     = require('./tasks/version'),

  // docs tasks
  serveDocs   = require('./tasks/docs/serve'),
  buildDocs   = require('./tasks/docs/build'),

  // rtl
  buildRTL    = require('./tasks/rtl/build'),
  watchRTL    = require('./tasks/rtl/watch')
;


/*******************************
 *             Tasks
 *******************************/

gulp.task('watch', watch);
gulp.task('watch').description = 'Watch for site/theme changes';

gulp.task('build', build);
gulp.task('build').description = 'Builds all files from source';
gulp.task('build-javascript', buildJS);
gulp.task('build-javascript').description = 'Builds all javascript from source';
gulp.task('build-css', buildCSS);
gulp.task('build-css').description = 'Builds all css from source';
gulp.task('build-assets', buildAssets);
gulp.task('build-assets').description = 'Copies all assets from source';

gulp.task('clean', clean);
gulp.task('clean').description = 'Clean dist folder';
gulp.task('version', version);
gulp.task('version').description = 'Clean dist folder';

gulp.task('default', gulp.series('check-install'));

/*--------------
      Docs
---------------*/

/*
  Lets you serve files to a local documentation instance
  https://github.com/Semantic-Org/Semantic-UI-Docs/
*/

gulp.task('serve-docs', serveDocs);
gulp.task('serve-docs').description = 'Serve file changes to SUI Docs';
gulp.task('build-docs', buildDocs);
gulp.task('build-docs').description = 'Build all files and add to SUI Docs';

/*--------------
      RTL
---------------*/

if (config.rtl) {
  gulp.task('watch-rtl', watchRTL);
  gulp.task('watch-rtl').description = 'Watch files as RTL';
  gulp.task('build-rtl', buildRTL);
  gulp.task('build-rtl').description = 'Build all files as RTL';
}
