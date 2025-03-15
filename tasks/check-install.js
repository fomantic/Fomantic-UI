/*******************************
 *        Check Install
 *******************************/

// node dependencies
const console = require('@fomantic/better-console');
const isSetup = require('./config/project/install').isSetup;

const install = require('./install');
const watch = require('./watch');

// export task
module.exports = function (callback) {
    setTimeout(function () {
        if (!isSetup()) {
            console.log('Starting install...');
            install(callback);
        } else {
            watch(callback);
        }
    }, 50); // Delay to allow console.clear to remove messages from check event
};
