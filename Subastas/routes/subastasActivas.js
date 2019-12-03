const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Subastas activas")
})

module.exports = router;