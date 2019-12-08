const {mongoose} = require('./mongodb-connect')
const Config = require ('./Config')

let productSchema = mongoose.Schema({
    titulo: {
        type:String,
        required:true
    },
    descripcion: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        require: true
    },
    image:{
        type:String,
        required: true
    },
    estado:{
        type:String,
        required: true
    },
    finFechaDia:{
        type:String,
        required: true
    },
    finFechaHora:{
        type:String,
        required: true
    },
    autor:{
        type:String,
        required: true
    },
    precioInicial:{
        type:Number,
        required: true
    },
    precioActual:{
        type: Number,
        default: 0,
        required: true
    },
    activado:{
        type:Boolean,
        default: true,
        required: true
    },
    usuariosIn:{
        type: Array,
        required: true
    }
});

let Product = mongoose.model('product', productSchema);

module.exports = Product;