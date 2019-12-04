const {mongoose} = require('./mongodb-connect')
const Config = require ('./Config')

let productSchema = mongoose.Schema({
    titulo: {
        type:String,
        required:true
    },
    imagen: {
        type: String,
        required: true
    },
    tiempo:{
        type:String,
        required: true
    },
    boton:{
        type:String,
        required: true
    }
});

let Product = mongoose.model('product', productSchema);

module.exports = Product;





