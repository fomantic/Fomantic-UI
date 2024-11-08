/*******************************
     Create Distributions
*******************************/

/*
 This will create individual distribution repositories for each FUI distribution

  * copy distribution files to release
  * update package.json file
*/

const
    // node dependencies
    fs              = require('fs'),
    path            = require('path'),
    gulp            = require('gulp'),
    mergeStream     = require('merge-stream'),

    // admin dependencies
    flatten         = require('gulp-flatten'),
    jsonEditor      = require('gulp-json-editor'),
    plumber         = require('@fomantic/gulp-plumber'),
    rename          = require('gulp-rename'),
    replace         = require('gulp-replace'),

    // config
    config          = require('../../config/user'),
    release         = require('../../config/admin/release'),
    project         = require('../../config/project/release'),

    // shorthand
    version         = project.version,
    output          = config.paths.output
;

module.exports = function (callback) {
    let
        stream,
        index,
        tasks = []
    ;

    for (index in release.distributions) {
        let
            distribution = release.distributions[index]
    ;

        // streams... designed to save time and make coding fun...
        (function (distribution) {
            let
                distLowerCase   = distribution.toLowerCase(),
                outputDirectory = path.join(release.outputRoot, distLowerCase),
                packageFile     = path.join(outputDirectory, release.files.npm),
                repoName        = release.distRepoRoot + distribution,
                regExp          = {
                    match: {
                        files: '{files}',
                        version: '{version}',
                    },
                },
                task = {
                    all: distribution + ' copying files',
                    repo: distribution + ' create repo',
                    meteor: distribution + ' create meteor package.js',
                    package: distribution + ' create package.json',
                },
                gatherFiles,
                createList
            ;

            // get files for meteor
            gatherFiles = function (dir) {
                dir = dir || path.resolve('.');
                let
                    list  = fs.readdirSync(dir),
                    omitted = [
                        '.git',
                        'node_modules',
                        'package.js',
                        'LICENSE',
                        'README.md',
                        'package.json',
                        'bower.json',
                        '.gitignore',
                    ],
                    files = []
                ;
                list.forEach(function (file) {
                    let
                        isOmitted = omitted.indexOf(file) > -1,
                        filePath  = path.join(dir, file),
                        stat      = fs.statSync(filePath)
                    ;
                    if (!isOmitted) {
                        if (stat && stat.isDirectory()) {
                            files = files.concat(gatherFiles(filePath));
                        } else {
                            files.push(filePath.replace(outputDirectory + path.sep, ''));
                        }
                    }
                });

                return files;
            };

            // spaces out list correctly
            createList = function (files) {
                let filenames = '';
                for (let file in files) {
                    filenames += "'" + files[file] + "'"
                        + (file === files.length - 1 ? '' : ',\n    ');
                }

                return filenames;
            };

            tasks.push(function () {
                let
                    files     = gatherFiles(outputDirectory),
                    filenames = createList(files)
                ;
                gulp.src(release.templates.meteor[distLowerCase])
                    .pipe(plumber())
                    .pipe(flatten())
                    .pipe(replace(regExp.match.version, version))
                    .pipe(replace(regExp.match.files, filenames))
                    .pipe(rename(release.files.meteor))
                    .pipe(gulp.dest(outputDirectory))
                ;
            });

            if (distribution === 'CSS') {
                tasks.push(function () {
                    let
                        themes,
                        components,
                        releases
                    ;
                    themes = gulp.src('dist/themes/default/**/*', { base: 'dist/', encoding: false })
                        .pipe(gulp.dest(outputDirectory))
                    ;
                    components = gulp.src('dist/components/*', { base: 'dist/' })
                        .pipe(gulp.dest(outputDirectory))
                    ;
                    releases = gulp.src('dist/*', { base: 'dist/' })
                        .pipe(gulp.dest(outputDirectory))
                    ;

                    return mergeStream(themes, components, releases);
                });
            } else if (distribution === 'LESS') {
                tasks.push(function () {
                    let
                        definitions,
                        overridesImport,
                        lessImport,
                        themeImport,
                        themeConfig,
                        siteTheme,
                        themes
                    ;
                    definitions = gulp.src('src/definitions/**/*', { base: 'src/' })
                        .pipe(gulp.dest(outputDirectory))
                    ;
                    overridesImport = gulp.src('src/overrides.less', { base: 'src/' })
                        .pipe(gulp.dest(outputDirectory))
                    ;
                    lessImport = gulp.src('src/semantic.less', { base: 'src/' })
                        .pipe(gulp.dest(outputDirectory))
                    ;
                    themeImport = gulp.src('src/theme.less', { base: 'src/' })
                        .pipe(gulp.dest(outputDirectory))
                    ;
                    themeConfig = gulp.src('src/theme.config.example', { base: 'src/' })
                        .pipe(gulp.dest(outputDirectory))
                    ;
                    siteTheme = gulp.src('src/_site/**/*', { base: 'src/' })
                        .pipe(gulp.dest(outputDirectory))
                    ;
                    themes = gulp.src('src/themes/**/*', { base: 'src/', encoding: false })
                        .pipe(gulp.dest(outputDirectory))
                    ;

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
                    .pipe(gulp.dest(outputDirectory))
                ;
            });
        })(distribution);
    }

    gulp.series(...tasks)(callback);
};
