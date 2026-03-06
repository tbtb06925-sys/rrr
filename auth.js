
const mongoose = require("mongoose");

const RegistroSchema = new mongoose.Schema({
    usuarioId:String,
    material:String,
    cantidad:Number,
    fecha:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Registro", RegistroSchema);
