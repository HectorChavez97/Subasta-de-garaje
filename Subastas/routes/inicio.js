const jwt       = require('jsonwebtoken')
const verificar = require('../middlewares/Auth')
const express   = require('express');
const Product   = require('../models/Product')
const router    = express.Router();


router.get('/', verificarToken, async (req, res) => {
    let products = await Product.find().limit(9).sort('created') 

    try {
        let token = await jwt.verify(req.token, 'secretKey')
        if(token)   return res.status(200).send(products)
    } catch (err) {} 

    return res.status(403).send(products)
})

function verificarToken(req, res, next){
    if(req.cookies.refreshtoken != undefined && req.headers['authorization'] != undefined){
        const authorization = req.headers['authorization']
    
        let token = authorization.split(' ')[1]
        req.token = token
    }

    next() 
}

module.exports = router;