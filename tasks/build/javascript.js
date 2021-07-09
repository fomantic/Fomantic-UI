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
  normalize  = require('normalize-path'),
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
function build(src, type, compress, config) {
  return gulp.src(src)
    .pipe(plumber())
    .pipe(flatten())
    .pipe(replace(comments.license.in, comments.license.out))
    .pipe(gulpif(compress, uglify(settings.uglify)))
    .pipe(gulpif(compress, rename(settings.rename.minJS)))
    .pipe(header(banner, settings.header))
    .pipe(gulpif(config.hasPermissions, chmod(config.parsedPermissions)))
    .pipe(gulp.dest(compress ? config.paths.output.compressed : config.paths.output.uncompressed))
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

  return gulp.src((compress ? output.compressed : output.uncompressed) + '/**/' + globs.components + globs.ignored + (compress ? '.min.js' : '!(*.min).js'))
    .pipe(plumber())
    .pipe(dedupe())
    .pipe(replace(compress ? assets.compressed : assets.uncompressed, assets.packaged))
    .pipe(concat(concatenatedJS))
    .pipe(gulpif(compress, uglify(settings.concatUglify)))
    .pipe(header(banner, settings.header))
    .pipe(gulpif(config.hasPermissions, chmod(config.parsedPermissions)))
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
    src      = config.paths.source.definitions + '/**/' + config.globs.components + (config.globs.ignored || '') + '.js';
  }

  if (globs.individuals !== undefined && typeof src === 'string') {
    const individuals = config.globs.individuals.replace('{','');
    const components = config.globs.components.replace('}',',').concat(individuals);

    src = config.paths.source.definitions + '/**/' + components + (config.globs.ignored || '') + '.js';
  }

  // copy source javascript
  const buildUncompressed       = () => build(src, type, false, config);
  buildUncompressed.displayName = "Building uncompressed Javascript";

  const buildCompressed       = () => build(src, type, true, config);
  buildCompressed.displayName = "Building compressed Javascript";

  const packUncompressed       = () => pack(type, false);
  packUncompressed.displayName = 'Packing uncompressed Javascript';

  const packCompressed       = () => pack(type, true);
  packCompressed.displayName = 'Packing compressed Javascript';

  if ([null, undefined, 'both'].includes(config.compressed)) {
    gulp.parallel(
      gulp.series(buildUncompressed, packUncompressed),
      gulp.series(buildCompressed, packCompressed)
    )(callback);
  } else if (config.compressed === true || config.compressed === 'Yes') {
    gulp.series(buildCompressed, packCompressed)(callback);
  } else {
    gulp.series(buildUncompressed, packUncompressed)(callback);
  }
}

module.exports = function (callback) {
  buildJS(false, config, callback);
};

// We keep the changed files in an array to call build with all of them at the same time
let timeout, files = [];

module.exports.watch = function (type, config) {
  gulp
    .watch([normalize(config.paths.source.definitions + '/**/*.js')])
    .on('all', function (event, path) {
      // We don't handle deleted files yet
      if (event === 'unlink' || event === 'unlinkDir') {
        return;
      }

      // Clear timeout
      timeout && clearTimeout(timeout);

      // Add file to internal changed files array
      if (!files.includes(path)) {
        files.push(path);
      }

      // Update timeout
      timeout = setTimeout(() => {
        console.log('Change in javascript detected');
        // Copy files to build in another array
        const buildFiles = [...files];
        // Call method
        gulp.series((callback) => buildJS(buildFiles, type, config, callback))();
        // Reset internal changed files array
        files = [];
      }, 1000);
    });
};

module.exports.buildJS = buildJS;
