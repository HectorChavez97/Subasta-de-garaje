const Producto  = require('../models/Product')
const express   = require('express');
const router    = express.Router();

router.get('/:id', async (req, res) => {
    let id = {
        _id: req.params.id.replace(":", "")
    }

    const product = await Producto.findById(id.str)
    
    if(!product) return res.status(403).send("No existe elemento con ese ID")
    else return res.send(product);
})


module.exports = router;