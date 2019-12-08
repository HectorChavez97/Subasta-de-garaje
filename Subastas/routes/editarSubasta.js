const express = require('express');
const router = express.Router();
const Producto  = require('../models/Product')


router.put('/:id', async (req, res) => {
    console.log("entro")
    let id = req.body.id;
    let producto =  await Producto.findOne({id:id})
    if(req.body.titulo) {
        producto.titulo = req.body.titulo;
    }

    if(req.body.descripcion) {
        producto.descripcion = req.body.descripcion;
    }

    if(req.body.categoria) {
        producto.categoria = req.body.categoria;
    }

    if(req.body.image) {
        producto.image = req.body.image;
    }

    if(req.body.estado) {
        producto.estado = req.body.estado;
    }

    if(req.body.finFechaDia) {
        producto.finFechaDia = req.body.finFechaDia;
    }

    if(req.body.finFechaHora) {
        producto.finFechaHora = req.body.finFechaHora;
    }

    if(req.body.precioActual) {
        producto.precioActual = req.body.precioActual;
    }
    
    await producto.save();
    res.status(200).send('good');
})
module.exports = router;