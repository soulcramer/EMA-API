exports.get = function (request, response) {

    let promoId = request.params[0];
    if (!promoId) {
        return ema.db.all('Promos').then(promos => {
            // console.log(promos);
            response.json(promos);
        }).catch(error => {
            response.writeHead(HTTP.BAD_REQUEST);
            response.json({
                error: error.toString()
            });
        });
    }

    ema.db.get('Promos', promoId).then(promo => {
        response.end({promo});
    }).catch(error => {
        response.writeHead(HTTP.BAD_REQUEST);
        response.json({
            error: error.toString()
        });
    })


};
