const Producto  = require('../models/Product')
const express   = require('express');
const router    = express.Router();

router.get('/:id', async (req, res) => {
    let id = req.params.id.replace(":", "")
    let actualDate = new Date();
    let actualHour = actualDate.getTime();

    const product = await Producto.find({_id: id})
    
    if(!product) return res.status(403).send("No existe elemento con ese ID")
    else         {
        if(req.body.finFechaDia < actualDate) {
            if(req.body.finFechaHora < actualHour) {
                req.body.activado = 'inactive';
            }
        }
        return res.status(200).send(product); }
})

router.patch('/:id', async (req, res) => {
    let id = req.params.id.replace(":", "")

    const product = await Producto.findOne({_id: id})

    if(!product) return res.status(403).send("incorrecto")

    product.precioActual = req.body.precioActual
    await product.save()
    
    return res.status(200).send("correcto")
})

module.exports = router;