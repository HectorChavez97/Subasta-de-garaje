const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
 //   try {
        if (req.cookies.refreshtoken == undefined) return res.send({Mensaje: 'No has iniciado sesion'})
        else{
            res.clearCookie('refreshtoken')
            return res.send({ Mensaje: 'Cerraste sesion'})
        } 
 //   } catch (err) {
 //       res.clearCookie('refreshtoken')
 //       return res.send({ Mensaje: 'Cerraste sesion'})
 //   }
})

module.exports = router;