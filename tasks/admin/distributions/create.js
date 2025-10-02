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
    let tasks = [];

    for (const distribution of release.distributions) {
        // streams... designed to save time and make coding fun...
        (function (distribution) {
            let distLowerCase = distribution.toLowerCase();
            let outputDirectory = path.join(release.outputRoot, distLowerCase);
            let packageFile = path.join(outputDirectory, release.files.npm);
            let regExp = {
                match: {
                    files: '{files}',
                    version: '{version}',
                },
            };
            let gatherFiles;
            let createList;

            // get files for meteor
            gatherFiles = function (dir) {
                dir = dir || path.resolve('.');
                let list = fs.readdirSync(dir);
                let omitted = new Set([
                    '.git',
                    'node_modules',
                    'package.js',
                    'LICENSE',
                    'README.md',
                    'package.json',
                    'bower.json',
                    '.gitignore',
                ]);
                let files = [];
                list.forEach(function (file) {
                    let isOmitted = omitted.has(file);
                    let filePath = path.join(dir, file);
                    let stat = fs.statSync(filePath);
                    if (!isOmitted) {
                        if (stat && stat.isDirectory()) {
                            files = [...files, ...gatherFiles(filePath)];
                        } else {
                            files.push(filePath.replace(outputDirectory + path.sep, ''));
                        }
                    }
                });

                return files;
            };

            // spaces out list correctly
            createList = function (files) {
                return files.map((f) => "'" + f + "'").join(',\n    ');
            };

            tasks.push(function () {
                let files = gatherFiles(outputDirectory);
                let filenames = createList(files);
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
                    let themes;
                    let components;
                    let releases;
                    themes = gulp.src('dist/themes/default/**/*', { base: 'dist/', encoding: false })
                        .pipe(gulp.dest(outputDirectory));
                    components = gulp.src('dist/components/*', { base: 'dist/' })
                        .pipe(gulp.dest(outputDirectory));
                    releases = gulp.src('dist/*', { base: 'dist/' })
                        .pipe(gulp.dest(outputDirectory));

                    return mergeStream(themes, components, releases);
                });
            } else if (distribution === 'LESS') {
                tasks.push(function () {
                    let definitions;
                    let overridesImport;
                    let lessImport;
                    let themeImport;
                    let themeConfig;
                    let siteTheme;
                    let themes;
                    definitions = gulp.src('src/definitions/**/*', { base: 'src/' })
                        .pipe(gulp.dest(outputDirectory));
                    overridesImport = gulp.src('src/overrides.less', { base: 'src/' })
                        .pipe(gulp.dest(outputDirectory));
                    lessImport = gulp.src('src/semantic.less', { base: 'src/' })
                        .pipe(gulp.dest(outputDirectory));
                    themeImport = gulp.src('src/theme.less', { base: 'src/' })
                        .pipe(gulp.dest(outputDirectory));
                    themeConfig = gulp.src('src/theme.config.example', { base: 'src/' })
                        .pipe(gulp.dest(outputDirectory));
                    siteTheme = gulp.src('src/_site/**/*', { base: 'src/' })
                        .pipe(gulp.dest(outputDirectory));
                    themes = gulp.src('src/themes/**/*', { base: 'src/', encoding: false })
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
