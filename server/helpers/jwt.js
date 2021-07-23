const jwt = require('jsonwebtoken')

function jwtGenerator(payload) {
    return jwt.sign(payload, 'rahasia')
}

function jwtValidator(token) {
    return jwt.verify(token, 'rahasia')
}

module.exports = { jwtGenerator, jwtValidator }