/*******************************
     Create Distributions
*******************************/

/*
 This will create individual distribution repositories for each FUI distribution

  * copy distribution files to release
  * update package.json file
*/

// node dependencies
const fs = require('node:fs');
const path = require('node:path');
const gulp = require('gulp');
const mergeStream = require('merge-stream');

// admin dependencies
const flatten = require('gulp-flatten');
const jsonEditor = require('gulp-json-editor');
const plumber = require('@fomantic/gulp-plumber');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

// config
const release = require('../../config/admin/release');
const project = require('../../config/project/release');

// shorthand
const version = project.version;

module.exports = function (callback) {
    const tasks = [];

    for (const distribution of release.distributions) {
        // streams... designed to save time and make coding fun...
        (function (distribution) {
            const distLowerCase = distribution.toLowerCase();
            const outputDirectory = path.join(release.outputRoot, distLowerCase);
            const packageFile = path.join(outputDirectory, release.files.npm);
            const regExp = {
                match: {
                    files: '{files}',
                    version: '{version}',
                },
            };

            // get files for meteor
            const gatherFiles = function (dir) {
                dir = dir || path.resolve('.');
                const list = fs.readdirSync(dir);
                const omitted = new Set([
                    '.git',
                    'node_modules',
                    'package.js',
                    'LICENSE',
                    'README.md',
                    'package.json',
                    '.gitignore',
                ]);
                let files = [];
                for (const file of list) {
                    const isOmitted = omitted.has(file);
                    const filePath = path.join(dir, file);
                    const stat = fs.statSync(filePath);
                    if (!isOmitted) {
                        if (stat && stat.isDirectory()) {
                            files = [...files, ...gatherFiles(filePath)];
                        } else {
                            files.push(filePath.replace(outputDirectory + path.sep, ''));
                        }
                    }
                }

                return files;
            };

            // spaces out list correctly
            const createList = function (files) {
                return files.map((f) => "'" + f + "'").join(',\n    ');
            };

            tasks.push(function () {
                const files = gatherFiles(outputDirectory);
                const filenames = createList(files);
                gulp.src(release.templates.meteor[distLowerCase])
                    .pipe(plumber())
                    .pipe(flatten())
                    .pipe(replace(regExp.match.version, version))
                    .pipe(replace(regExp.match.files, filenames))
                    .pipe(rename(release.files.meteor))
                    .pipe(gulp.dest(outputDirectory));
            });

            if (distribution === 'CSS') {
                tasks.push(function () {
                    const themes = gulp.src('dist/themes/default/**/*', { base: 'dist/', encoding: false })
                        .pipe(gulp.dest(outputDirectory));
                    const components = gulp.src('dist/components/*', { base: 'dist/' })
                        .pipe(gulp.dest(outputDirectory));
                    const releases = gulp.src('dist/*', { base: 'dist/' })
                        .pipe(gulp.dest(outputDirectory));

                    return mergeStream(themes, components, releases);
                });
            } else if (distribution === 'LESS') {
                tasks.push(function () {
                    const definitions = gulp.src('src/definitions/**/*', { base: 'src/' })
                        .pipe(gulp.dest(outputDirectory));
                    const overridesImport = gulp.src('src/overrides.less', { base: 'src/' })
                        .pipe(gulp.dest(outputDirectory));
                    const lessImport = gulp.src('src/semantic.less', { base: 'src/' })
                        .pipe(gulp.dest(outputDirectory));
                    const themeImport = gulp.src('src/theme.less', { base: 'src/' })
                        .pipe(gulp.dest(outputDirectory));
                    const themeConfig = gulp.src('src/theme.config.example', { base: 'src/' })
                        .pipe(gulp.dest(outputDirectory));
                    const siteTheme = gulp.src('src/_site/**/*', { base: 'src/' })
                        .pipe(gulp.dest(outputDirectory));
                    const themes = gulp.src('src/themes/**/*', { base: 'src/', encoding: false })
                        .pipe(gulp.dest(outputDirectory));

                    return mergeStream(definitions, overridesImport, lessImport, themeImport, themeConfig, siteTheme, themes);
                });
            }

            // extend package.json
            tasks.push(function () {
                return gulp.src(packageFile)
                    .pipe(plumber())
                    .pipe(jsonEditor(function (pkg) {
                        if (version) {
                            pkg.version = version;
                        }

                        return pkg;
                    }))
                    .pipe(gulp.dest(outputDirectory));
            });
        })(distribution);
    }

    gulp.series(...tasks)(callback);
};
