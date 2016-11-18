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

let now = new Date();
let request = require('request-promise');
let headers = {
    'User-Agent': 'Anime Release Notifier',
    'Accept': 'application/json'
};
let promoList = null;
const baseUrl = 'http://webdfd.mines-ales.fr/cybema/cgi-bin/cgiempt.exe';


let getPromoList = function (body) {
    return body.split(" \r\n")
        .filter(function (item) {
            return item !== "EOT";

        })
        .map(function (textPromo) {
                let arrayPromo = textPromo.split(';');

                return {
                    "id": arrayPromo[1],
                    "name": arrayPromo[3],
                    "bg_color": arrayPromo[7],
                    "txt_color": arrayPromo[9]
                };
            }
        );
};
request({
    uri: `${baseUrl}?TYPE=promos_txt`,
    method: 'GET',
    headers: headers
}).then(body =>

    console.log(getPromoList(body))
);
// Start the server
app.run();
