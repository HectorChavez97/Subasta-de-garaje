const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Publicar")
})

module.exports = router;