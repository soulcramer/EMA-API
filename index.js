"use strict";

let ema = require('./lib');
let app = require('aero')();

global.app = app;
global.ema = ema;
global.HTTP = require('http-status-codes');

app.on('database ready', db => {
    global.db = db;
});

// For POST requests
app.use(require('body-parser').json());

// Start the server
app.run();
