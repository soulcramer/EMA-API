const hosts = [
    'http://webdfd.mines-ales.fr',
    'http://webdfd.mines-ales.fr/cybema/cgi-bin/cgiempt.exe?TYPE=config_txt',
    'http://webdfd.mines-ales.fr/restau/Menu_semaine.pdf',
    'http://webdfd.mines-ales.fr/cybernotes',
];

let updateStatus = coroutine(function*() {
    let status = [];

    console.log(chalk.yellow('✖'), 'Updating status...');

    for (let host of hosts) {
        yield Promise.delay(100);

        yield fetch({
            uri: host,
            method: 'GET',
            headers: {
                'User-Agent': 'EMA API'
            }
        })
            .then(body => {
                console.log(chalk.green('✔'), host, 'alive');

                status.push({
                    context: host,
                    error: ''
                })
            })
            .catch(e => {
                console.log(chalk.red('✖'), host, 'dead');

                status.push({
                    context: host,
                    error: e.toString()
                })
            })
    }

    ema.set('Cache', 'status', status)
});

ema.repeatedly(30 * minutes, updateStatus);
