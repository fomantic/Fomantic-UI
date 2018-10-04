/*******************************
 Build Task
 *******************************/

const
  gulp       = require('gulp'),

  // node dependencies
  console    = require('better-console'),

  // gulp dependencies
  chmod      = require('gulp-chmod'),
  concat     = require('gulp-concat'),
  dedupe     = require('gulp-dedupe'),
  flatten    = require('gulp-flatten'),
  gulpif     = require('gulp-if'),
  header     = require('gulp-header'),
  plumber    = require('gulp-plumber'),
  print      = require('gulp-print'),
  rename     = require('gulp-rename'),
  replace    = require('gulp-replace'),
  uglify     = require('gulp-uglify'),

  // config
  config     = require('./../config/user'),
  docsConfig = require('./../config/docs'),
  tasks      = require('../config/tasks'),
  install    = require('../config/project/install'),

  // shorthand
  globs      = config.globs,
  assets     = config.paths.assets,

  banner     = tasks.banner,
  filenames  = tasks.filenames,
  comments   = tasks.regExp.comments,
  log        = tasks.log,
  settings   = tasks.settings
;


function pack(type, compress) {
  const output         = type === 'docs' ? docsConfig.paths.output : config.paths.output;
  const concatenatedJS = compress ? filenames.concatenatedMinifiedJS : filenames.concatenatedJS;

  return gulp.src(output.uncompressed + '/**/' + globs.components + globs.ignored + '.js')
    .pipe(plumber())
    .pipe(dedupe())
    .pipe(replace(assets.uncompressed, assets.packaged))
    .pipe(concat(concatenatedJS))
    .pipe(gulpif(compress, uglify(settings.concatUglify)))
    .pipe(header(banner, settings.header))
    .pipe(gulpif(config.hasPermission, chmod(config.permission)))
    .pipe(gulp.dest(output.packaged))
    .pipe(print(log.created))
    ;
}

function buildJS(type, config, callback) {
  console.info('Building Javascript');

  if (!install.isSetup()) {
    console.error('Cannot build files. Run "gulp install" to set-up Semantic');
    callback();
    return;
  }

  // copy source javascript
  function js() {
    return gulp.src(config.paths.source.definitions + '/**/' + config.globs.components + '.js', {since: gulp.lastRun('build-javascript')})
      .pipe(plumber())
      .pipe(flatten())
      .pipe(replace(comments.license.in, comments.license.out))
      .pipe(gulp.dest(config.paths.output.uncompressed))
      .pipe(gulpif(config.hasPermission, chmod(config.permission)))
      .pipe(print(log.created))
      .pipe(uglify(settings.uglify))
      .pipe(rename(settings.rename.minJS))
      .pipe(header(banner, settings.header))
      .pipe(gulp.dest(config.paths.output.compressed))
      .pipe(gulpif(config.hasPermission, chmod(config.permission)))
      .pipe(print(log.created))
      ;
  }

  gulp.series(js,
    gulp.parallel(() => pack(type, false), () => pack(type, true))
  )
  (callback);
}

module.exports         = function (callback) {
  buildJS(false, config, callback);
};
module.exports.buildJS = buildJS;