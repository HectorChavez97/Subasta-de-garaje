const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.cookies.refreshtoken == undefined) return res.status(303).send('No has iniciado sesion')
    else{
        res.clearCookie('refreshtoken')
        return res.status(200).send('Cerraste sesion')
    } 
})

module.exports = router;