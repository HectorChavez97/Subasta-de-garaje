const Product = require('../models/Product')
const express = require('express');
const atob = require('atob');
const router = express.Router();


router.get('/', async (req, res) => {
    let token = req.cookies.refreshtoken

    if(token == undefined) return res.status(403).send("No estas loggeado")    
    let user = decodeToken(token);

    let historialProduct = await Product.find({})
    console.log(user)

    res.send("historial")
})

function decodeToken(token){
    var playload = JSON.parse(atob(token.split('.')[1]));
    console.log(playload);
};

module.exports = router;