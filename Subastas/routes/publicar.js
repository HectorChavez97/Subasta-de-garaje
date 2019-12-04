const express = require('express');
const router = express.Router();
const Product = require('../models/Product')

//creando nuevo producto de subasta
router.post('/', async(req, res) => {
    try{
        let {
            titulo,
            descripcion,
            image,
            estado,
            finFechaDia,
            finFechaHora,
            autor,
            precioInicial
        } = req.body;

        if(titulo != undefined && descripcion != undefined && image != undefined && estado != undefined &&
            finFechaDia != undefined && finFechaHora && precioInicial != undefined && autor != undefined) {
                    
                    let product = new Product({
                    titulo: req.body.titulo, 
                    descripcion: req.body.descripcion,
                    image: req.body.image,
                    estado: req.body.estado,
                    finFechaDia: req.body.finFechaDia,
                    finFechaHora: req.body.finFechaHora,
                    autor: req.body.autor,
                    precioInicial: req.body.precioInicial
                });
                await product.save();
                res.status(201).send(product);
            } else {
                return res.status(400).send('Informacion incompleta para terminar el registro');
            }

    } catch(err) {
        res.status(400).send({
            error: 'ocurrió un error',
            detalle: err
        });
    }
})

router.get('/', (req, res) => {
    console.log('todo bien')
    res.status(200)
})
/*
router.get('/products', (req, res)=> {
    if(req.query.titulo) {
    res.send(`Haciendo get por parametro a ${req.query.titulo}`)}
    
})

router.get('/products/:titulo', (req, res) => {
    res.send(`Haciendo get a ${req.params.titulo}`);
    Product.findOne({titulo: req.query.titulo});
})*/

module.exports = router;