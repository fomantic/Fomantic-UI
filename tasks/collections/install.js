/*******************************
 *   Define Install Sub-Tasks
 *******************************/

// docs tasks
const
    install = require('../install'),
    checkInstall = require('../check-install')
;

/*
  Lets you serve files to a local documentation instance
  https://github.com/fomantic/Fomantic-UI-Docs/
*/
module.exports = function (gulp) {
    gulp.task('install', install);
    gulp.task('install').description = 'Runs set-up';

    gulp.task('check-install', checkInstall);
    gulp.task('check-install').description = 'Displays current version of Fomantic';
};
