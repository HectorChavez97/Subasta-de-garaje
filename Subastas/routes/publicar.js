const express = require('express');
const router = express.Router();
const Product = require('../models/Product')

//INSERTAR http://localhost:3000/api/publicar/
router.post('/', async(req, res) => {
    try{
        let {
            titulo,
            descripcion,
            categoria,
            image,
            estado,
            finFechaDia,
            finFechaHora,
            autor,
            precioInicial
        } = req.body;

        if(titulo != undefined && descripcion != undefined && image != undefined && estado != undefined && categoria != undefined &&
             finFechaDia != undefined && finFechaHora && precioInicial != undefined && autor != undefined) {
                    
                    let product = new Product({
                    titulo: req.body.titulo, 
                    descripcion: req.body.descripcion,
                    categoria: req.body.categoria,
                    image: req.body.image,
                    estado: req.body.estado,
                    finFechaDia: req.body.finFechaDia,
                    finFechaHora: req.body.finFechaHora,
                    autor: req.body.autor,
                    precioInicial: req.body.precioInicial,
                    precioActual: req.body.precioInicial
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
/*
//OBTENER POR TITULO
router.get('/', (req, res) => {
    if(!req.query.titulo) {
        return res.status(400).send('Falta un parametro: titulo de subasta');
    }

    Product.find({ //find() -> varios mismo nombre
        titulo: req.query.titulo
    }).then(doc =>{res.json(doc)})
    .catch(err => {
        res.status(500).json(err);
    })
})

//ACTUALIZAR PRODUCTO
router.patch('/', (req, res) => {
    if(!req.query.titulo) {
        return res.status(400).send('Falta titulo de la subasta para modificar');
    }

    Product.findOneAndUpdate({
        titulo: req.query.titulo
    }, req.body, {new:true}).then(doc => {
        res.json(doc)
    }).catch(err=>{res.status(500).json(err)})
})

//BORRAR PRODUCTO SUBASTA
router.delete('/', (req, res) => {
    if(!req.query.titulo) {
        return res.status(400).send('Falta titulo de la subasta para borrar');
    }
    Product.findOneAndRemove({
        titulo: req.query.titulo
    }).then(doc => {
        res.json(doc)
    }).catch(err=>{res.status(500).json(err)})
})*/

module.exports = router;