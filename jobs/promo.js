let updatePromoList = coroutine(function*() {
    console.log(chalk.yellow('✖'), 'Updating all promos pages...');

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
            .map(
                function (textPromo) {
                    let arrayPromo = textPromo.split(';');

                    let promo = {
                        "id": arrayPromo[1],
                        "name": arrayPromo[3],
                        "bg_color": arrayPromo[7],
                        "txt_color": arrayPromo[9]
                    };
                    ema.db.set('Promos', promo.id, promo);
                }
            );
    };
    request({
        uri: `${baseUrl}?TYPE=promos_txt`,
        method: 'GET',
        headers: headers
    }).then(body => {
        console.log(chalk.green('[Updating the Promotion list]'));
        getPromoList(body);
        console.log(chalk.green('[Promotion list updated]'))
    });

    // for(let promos of ema.promoList) {
    //     if(promos.pageGenerated && now.getTime() - (new Date(promos.pageGenerated)).getTime() < PromosCacheTime)
    //         continue;
    //
    //     yield Promise.delay(2000);
    //     yield ema.updateAnimePage(anime)
    // }
});

const PromosCacheTime = 120 * 60 * 1000;


ema.repeatedly(10 * hours, updatePromoList);