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
  print      = require('gulp-print').default,
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

/**
 * Concat and uglify the Javascript files
 * @param {string|array} src - source files
 * @param type
 * @param config
 * @return {*}
 */
function build(src, type, config) {
  return gulp.src(src)
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

/**
 * Packages the Javascript files in dist
 * @param {string} type - type of the js processing (none, rtl, docs)
 * @param {boolean} compress - should the output be compressed
 */
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

function buildJS(src, type, config, callback) {
  if (!install.isSetup()) {
    console.error('Cannot build Javascript. Run "gulp install" to set-up Semantic');
    callback();
    return;
  }

  if (callback === undefined) {
    callback = config;
    config   = type;
    type     = src;
    src      = config.paths.output.uncompressed + '/**/' + config.globs.components + config.globs.ignored + '.js';
  }

  // copy source javascript
  var js         = () => build(src, type, config);
  js.displayName = "Building un/compressed Javascript";

  var packUncompressed         = () => pack(type, false);
  packUncompressed.displayName = 'Packing uncompressed Javascript';

  var packCompressed         = () => pack(type, true);
  packCompressed.displayName = 'Packing compressed Javascript';

  gulp.series(js, gulp.parallel(packUncompressed, packCompressed))(callback);
}

module.exports = function (callback) {
  buildJS(false, config, callback);
};

module.exports.watch = function (type, config) {
  gulp
    .watch([config.paths.source.definitions + '/**/*.js'])
    .on('all', function (event, path) {
      console.log('Change in javascript detected');
      return gulp.series((callback) => buildJS(path, type, config, callback))();
    });
};

module.exports.buildJS = buildJS;