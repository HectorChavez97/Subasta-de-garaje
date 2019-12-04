const {sign} = require('jsonwebtoken')

const sendAccessToken = (req, res, accesstoken) => {
    res.status(404).send({
        accesstoken, 
        email: req.body.correo
    })
}

const sendRefreshToken = (res, token) => {
    res.cookie('refreshtoken' , token, {
        httpOnly: true
    })
}

module.exports = {
    sendAccessToken
}