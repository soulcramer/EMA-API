const PromosCacheTime = 120 * 60 * 1000;

let updatePromoList = coroutine(function*() {
    console.log(chalk.yellow('✖'), 'Updating all promo pages...');

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

        console.log(chalk.green('[Update Promo list]'), chalk.blue(getPromoList(body)))
    );

    // for(let promo of ema.promoList) {
    //     if(promo.pageGenerated && now.getTime() - (new Date(promo.pageGenerated)).getTime() < PromosCacheTime)
    //         continue;
    //
    //     yield Promise.delay(2000);
    //     yield ema.updateAnimePage(anime)
    // }
});


ema.repeatedly(10 * hours, updatePromoList);