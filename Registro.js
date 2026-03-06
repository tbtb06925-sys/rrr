
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nombre:String,
    usuario:{type:String, unique:true},
    password:String,
    foto:String,
    rol:{type:String, enum:["usuario","admin"], default:"usuario"}
});

module.exports = mongoose.model("User", UserSchema);
