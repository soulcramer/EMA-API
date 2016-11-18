let request = require('request-promise');
let headers = {
    'User-Agent': 'Anime Release Notifier',
    'Accept': 'application/json'
};
let response = {"entries": []};
const baseUrl = 'http://webdfd.mines-ales.fr/cybema/cgi-bin/cgiempt.exe';


request({
    uri: `${baseUrl}?TYPE=promos_txt`,
    method: 'GET',
    headers: headers
}).then(body => {
    let entry = body.split(" \r\n");
    // iterate through the promotions by skipping the last line containing EOT
    for (let i = 0; i < entry.length - 1; i++) {
        response.entries[i] = {};

        // Separatey
        let tempEntry = entry[i].split(';');
        for (let j = 0; j < tempEntry.length; j += 2) {
            let property = response.entries[i];
            property[tempEntry[j]] = tempEntry[j + 1];
            response.entries[i] = property;
        }
    }
    console.log(response);
});
