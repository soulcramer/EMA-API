exports.get = function*(request, response) {
    let users = yield database.getAll('Users')
    let users = "meh"

    response.render({
        users
    })
}
