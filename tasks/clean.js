/*******************************
          Clean Task
*******************************/

const
    fs    = require('fs-extra'),
    config = require('./config/user')
;

// cleans distribution files
module.exports = function (callback) {
    fs.removeSync(config.paths.clean);
    callback();
};
