const Producto  = require('../models/Product')
const express   = require('express');
const router    = express.Router();
const atob = require('atob');

router.get('/:id', async (req, res) => {
    let id = req.params.id.replace(":", "")

    const product = await Producto.find({_id: id})
    
    if(!product) return res.status(403).send("No existe elemento con ese ID")
    else         return res.status(200).send(product);
})

router.patch('/:id', async (req, res) => {
    let id = req.params.id.replace(":", "")

    const product = await Producto.findOne({_id: id})
    if(!product) return res.status(403).send("incorrecto")
    let token = req.cookies.refreshtoken

    if(token == undefined) return res.status(403).send("No estas loggeado")    
    let me = decodeToken(token);

    product.precioActual = req.body.precioActual
    product.usuariosIn.push(me._id)
    await product.save()
    
    return res.status(200).send("correcto")
})

function decodeToken(token){
    var playload = JSON.parse(atob(token.split('.')[1]));
    return playload["user"]
};




module.exports = router;