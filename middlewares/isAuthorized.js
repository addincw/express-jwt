module.exports = function(request, response, next) {
    const headerAuthorization = request.headers['authorization']

    if(!headerAuthorization) return response.json({ message: 'unauthorized'})

    const bearerToken = headerAuthorization.split(' ')
    const token = bearerToken[1]

    request.token = token
    next()
}