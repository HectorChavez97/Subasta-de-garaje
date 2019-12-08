const cors      = require('cors')
const bParser   = require('body-parser')
const cParser   = require('cookie-parser'); 
const express   = require('express');
const app       = express();
const port      = process.env.PORT || 3000; 

const inicioRouter      = require('./routes/inicio')
const loginRouter       = require('./routes/login')
const logoutRouter      = require('./routes/logout')
const registroRouter    = require('./routes/registro')
const publicarRouter    = require('./routes/publicar')
const contrasenaRouter  = require('./routes/contrasena')
const editarSRouter     = require('./routes/editarSubasta')
const sActivasRouter    = require('./routes/subastasActivas')
const miSubastaRouter   = require('./routes/miSubasta')
const producto          = require('./routes/producto');
const historialRouter   = require('./routes/historialSubasta');
const categorias        = require('./routes/categorias')

app.use(cors())
app.use(bParser.json())
app.use(cParser())

app.use(                 express.static(__dirname + "/public/inicioUsuario"))
app.use('/login'        ,express.static(__dirname + "/public/loginUsuario"))
app.use('/registro'     ,express.static(__dirname + "/public/registro"))
app.use('/publicar'     ,express.static(__dirname + "/public/publicar"))
app.use('/productos/:id',express.static(__dirname + "/public/producto"));
app.use('/historial'    ,express.static(__dirname + "/public/historialSubasta"));
app.use('/editar'       ,express.static(__dirname + "/public/editarSubasta"));
app.use('/categorias'   ,express.static(__dirname + "/public/categorias"));
app.use('/miSubasta'    ,express.static(__dirname + "/public/miSubasta"));


app.use('/api/inicio',  inicioRouter);
app.use('/api/login',   loginRouter);
app.use('/api/logout',  logoutRouter);
app.use('/api/registro', registroRouter);
app.use('/api/publicar', publicarRouter);
app.use('/api/contrasena', contrasenaRouter);
app.use('/api/editar',  editarSRouter);
app.use('/api/historial', historialRouter);
app.use('/api/subastasActivas', sActivasRouter);
app.use('/api/miSubastas', miSubastaRouter);
app.use('/api/producto', producto);
app.use('/api/categorias', categorias);

app.listen(port, () => console.log(`http://localhost:${port}`));