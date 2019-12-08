const jwt       = require('jsonwebtoken')
const verificar = require('../middlewares/Auth')
const express   = require('express');
const Product   = require('../models/Product')
const router    = express.Router();


router.get('/', verificarToken, async (req, res) => {
    let qpage = req.query.page || 0; //si no se especifica regresa pagina 0

    if(req.query.nombre){
        let  products = await Product.find({titulo: new RegExp(req.query.nombre, "i")}).find({activado: true})
        .skip(9 * qpage).limit(9).sort('created') 

        try {
            let token = await jwt.verify(req.token, 'secretKey')
            if(token)   return res.status(200).send(products)
        } catch (err) {} 
    
        return res.status(403).send(products)
    }
    else{
        let  products = await Product.find({activado: true}).skip(9 * qpage).limit(9).sort('created') 

        try {
            let token = await jwt.verify(req.token, 'secretKey')
            if(token)   return res.status(200).send(products)
        } catch (err) {} 
    
        return res.status(403).send(products)
    }
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