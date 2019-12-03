const {mongoose} = require('./mongodb-connect')
const Config = require ('./Config')

let userSchema = mongoose.Schema({
    nombre: {
        type:String,
        required:true
    },
    correo: {
        type: String,
        required: true
    },
    sexo:{
        type:String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    estado:{
        type: String,
        required: true
    },
    contrasena:{
        type:String,
        required: true
    }
});

let User = mongoose.model('users', userSchema);

module.exports = User;





