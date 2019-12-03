const jwt = require('jsonwebtoken')

function autenticarUser(req, res, next) {
    let token = req.header('x-user-token');
    
    if (token == undefined) {
        res.status(403).send({
            error: "falta token"
        })
        return
    }

    jwt.verify(token, 'subastas', function (err, decoded) {
        if (decoded) {
            req.correo = decoded.correo;
            req.uid = decoded.uid;
            req.rol = decoded.rol;
            next()
            return
        }

        res.status(403).send({
            error: "no autorizado"
        });
    });
}

module.exports = {autenticarUser}