const jwt = require('jsonwebtoken')

function isAuth(req, res, next) {
    const authorization = req.headers['authorization']

    if(!authorization) throw new Error("No tienes undwedwededwe token")

    jwt.verify(authorization, "paloma", function (err, decoded) {
        if (decoded) {
            console.log("hoalaaaaaaa")
            res.send({ decoded: "autorizado"}) 
            next()
            return
        }

        res.status(403).send({ error: "no autorizado" });
    })

    console.log(userId)
    return userId
}

module.exports = {isAuth}