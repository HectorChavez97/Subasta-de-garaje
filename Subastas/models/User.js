
const {mongoose} = require('./mongodb-connect')
const Config = require ('./Config')
const conf = require('./config.json')
const bcrypt = require('bcryptjs')

let userSchema = mongoose.Schema({
    uid:{
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type:String,
        required:true
    },
    apellido:{
        type:String,
        required:true
    },
    correo: {
        type: String,
        required: true
    },
    sexo:{
        type:String,
       // enum: ['H', 'M', 'O'],
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
    password:{
        type:String,
        required: true
    },
});

userSchema.statics.obtenerUsuario = function( correo){
    return User.findOne({correo}); 
}

userSchema.methods.actualizarUsuario = function(datos){
    return User.findOneAndUpdate(
                {_id:this._id},
                {$set:datos},
                {new: true}
                );
    
}

userSchema.statics.crearUsuario = async function(usr){
    let uid = await Config.crearConfigOrUpdate(usr)
    usr.uid = uid;

    usr.password = bcrypt.hashSync(usr.password, 8)
    
    //usr.rol = (uid == 0)? "ADMIN": "USER"
        
    console.log(usr)

    let newUser = User(usr);
    return await newUser.save()
}

let User = mongoose.model('users', userSchema);

module.exports = User;





