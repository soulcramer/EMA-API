global.ema = require('../lib');
global.chalk = require('chalk');
global.Promise = require('bluebird');
global.fetch = require('request-promise');
global.fs = Promise.promisifyAll(require('fs'));
global.coroutine = Promise.coroutine;

// Time units
global.seconds = 1;
global.minutes = 60 * seconds;
global.hours = 60 * minutes;

ema.db.scanPriority = require('aerospike').scanPriority.LOW;

ema.db.ready.then(Promise.coroutine(function*() {
    // ema.promoList = yield ema.filter('Promo', promo => true);
    // console.log(ema.promoList.length + ' promos');

    // Build search index
    // require('../startup/search-index');

    let files = yield fs.readdirAsync('jobs');
    let filterJob = process.argv[2];

    files.forEach(file => {
        if (file === 'index.js')
            return;

        if (filterJob && file !== filterJob + '.js')
            return;

        console.log(chalk.green('[Starting job]'), chalk.blue(file.replace('.js', '')));
        require('./' + file)
    })
}));