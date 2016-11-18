let Promise = require('bluebird');
let exec = require('child_process').exec;

ema.execute = Promise.promisify((command, callback) => {
    exec(command, function (error, stdout, stderr) {
        callback(error, stdout)
    })
});
