/*******************************
 *         Build Task
 *******************************/

const
    gulp = require('gulp'),
    build = require('../build')
;

// RTL builds are now handled by the default build process
module.exports = function (callback) {
    gulp.series(build)(callback);
};
