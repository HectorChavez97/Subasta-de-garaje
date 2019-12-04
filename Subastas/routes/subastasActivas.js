const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Subastas activas")
})

router.get('/:categoria', (req, res) => {
    let cartegoria = req.params.categoria
})

module.exports = router;