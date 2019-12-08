const Product = require('../models/Product')
const express = require('express');
const atob = require('atob');
const router = express.Router();


router.get('/', async (req, res) => {
    let token = req.cookies.refreshtoken

    if(token == undefined) return res.status(403).send("No estas loggeado")    
    let user = decodeToken(token);

    let historialProduct = await Product.find({autor: user._id})

    res.status(200).send(historialProduct)
})

function decodeToken(token){
    var playload = JSON.parse(atob(token.split('.')[1]));
    return playload["user"]
};

module.exports = router;