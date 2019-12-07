const express = require('express');
const router = express.Router();
const atob = require('atob');

router.get('/', (req, res) => {
    let token = req.cookies.refreshtoken

    if(token == undefined) return res.status(403).send("No estas loggeado")    
    let user = decodeToken(token);
    console.log(user)

    console.log(req.cookies.refreshtoken)
    res.send("historial")
})

function decodeToken(token){
    var playload = JSON.parse(atob(token.split('.')[1]));
    console.log(playload);
};

module.exports = router;