exports.get = (request, response) => {
    request = require('request-promise');
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
    }).then(body => {
        promoList = getPromoList(body);
        response.render({
            promos: promoList
        })

    });

};
