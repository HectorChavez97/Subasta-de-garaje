const Product = require('../models/Product')
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {

    const products = await Product.find({categoria: req.query.categoria}).limit(9)
    if(!products) return res.send(404)

    return res.status(200).send(products)
})

module.exports = router;