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
const historialSRouter  = require('./routes/historialSubasta')
const sActivasRouter    = require('./routes/subastasActivas')
const miSubastaRouter   = require('./routes/miSubasta')

app.use(cors())
app.use(bParser.json())
app.use(cParser())
app.use('/api/inicio', inicioRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/registro', registroRouter);
app.use('/api/publicar', publicarRouter);
app.use('/api/contrasena', contrasenaRouter);
app.use('/api/editar', editarSRouter);
app.use('/api/historial', historialSRouter);
app.use('/api/subastasActivas', sActivasRouter);
app.use('/api/miSubastas', miSubastaRouter);

app.listen(port, () => console.log(`http://localhost:${port}`));