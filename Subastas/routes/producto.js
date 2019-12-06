const express = require('express');
const router = express.Router();
const Product = require('../models/Product')


router.get('/:id',  (req, res) => {
    if(req.params.id == 'undefined') {
        return res.status(400).send('Falta un parametro: ID de subasta');
    }


    Product.findOne({
        id: req.params.id
    }).then(doc =>{res.json(doc)})
    .catch(err => {
        res.status(500).json(err);
    })
})
module.exports = router;