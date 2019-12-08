const Product = require('../models/Product')
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    let categoria = req.query.categoria
    if(categoria == undefined)  return res.status(403).send("query no valido")

    const products = await Product.find({categoria: req.query.categoria}).limit(9)

    return res.status(200).send(products)
})

module.exports = router;