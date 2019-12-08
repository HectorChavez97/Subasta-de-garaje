const express = require('express');
const Product = require('../models/Product')
const atob    = require('atob');
const router = express.Router();


//INSERTAR http://localhost:3000/api/publicar/
router.post('/', async(req, res) => {
    
    try{
        let token = req.cookies.refreshtoken

        if(token == undefined) return res.status(403).send("No estas loggeado")    
        let me = decodeToken(token);

        let {
            titulo,
            descripcion,
            categoria,
            image,
            estado,
            finFechaDia,
            finFechaHora,
            precioInicial
        } = req.body;

        if(titulo != undefined && descripcion != undefined && image != undefined && estado != undefined && categoria != undefined &&
             finFechaDia != undefined && finFechaHora && precioInicial != undefined) {
                    
                    let product = new Product({
                    titulo: req.body.titulo, 
                    descripcion: req.body.descripcion,
                    categoria: req.body.categoria,
                    image: req.body.image,
                    estado: req.body.estado,
                    finFechaDia: req.body.finFechaDia,
                    finFechaHora: req.body.finFechaHora,
                    autor: me,
                    precioInicial: req.body.precioInicial,
                    precioActual: req.body.precioInicial
                });
                
                await product.save();
                res.status(201).send(product);
            } else {
                return res.status(400).send('Informacion incompleta para terminar el registro');
            }

    } catch(err) {
        console.log(err)
        res.status(400).send({
            error: 'ocurrió un error',
            detalle: err
        });
    }
})

function decodeToken(token){
    var playload = JSON.parse(atob(token.split('.')[1]));
    return playload["user"]
};


/*//ACTUALIZAR PRODUCTO
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