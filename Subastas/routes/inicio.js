const jwt       = require('jsonwebtoken')
const verificar = require('../middlewares/Auth')
const express   = require('express');
const router    = express.Router();


router.get('/', verificarToken, async (req, res) => {
    if(typeof req.cookies.refreshtoken == 'undefined'){
        return res.status(404).send(`No estas logueado... + valor de token ${token}. Valor de req.cookies.refreshtoken ${req.cookies.refreshtoken}`);
    }
    else{
        let token = await jwt.verify(req.token, 'secretKey')

        if(token != req.cookies.refreshtoken){
            return res.status(201).send(`Estas logueado + valor de token ${token}. Valor de req.cookies.refreshtoken ${req.cookies.refreshtoken}` );
        }
        else{
            return res.status(200).send(`Se vencio el token + valor de token ${token}. Valor de req.cookies.refreshtoken ${req.cookies.refreshtoken}`);
        }
    }

})

function verificarToken(req, res, next){
    if(req.cookies.refreshtoken != undefined){
        const authorization = req.headers['authorization']

        if(!authorization) res.sendStatus(403)
    
        let token = authorization.split(' ')[1]
        req.token = token
    }
   
    next()
}

module.exports = router;