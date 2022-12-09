/*******************************
 *          Watch Task
 *******************************/

const gulp = require('gulp');
const watch = require('../watch');

// RTL watch are now handled by the default watch process
module.exports = function (callback) {
    gulp.series(watch)(callback);
};
