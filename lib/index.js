let fs = require('fs');
let path = require('path');
let EventEmitter = require('events').EventEmitter;

global.ema = {
    // apiKeys: require('../security/api-keys.json'),
    events: new EventEmitter(),
    maintenance: false,
    production: process.env.NODE_ENV === 'production'
};

ema.cacheAnimeLists = ema.production;

ema.on = function (eventName, func) {
    ema.events.on(eventName, func)
};

// Load every module inside the lib/modules directory
let modules = fs.readdirSync("./lib/modules");
modules.forEach(file => require('./' + path.join('modules', file.replace('.js', ''))));

module.exports = global.ema;
