
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/registro", async(req,res)=>{

try{

const {nombre,usuario,password,rol} = req.body;

const hash = await bcrypt.hash(password,10);

const nuevo = new User({
nombre,
usuario,
password:hash,
rol
});

await nuevo.save();

res.json({msg:"Usuario creado"});

}catch(e){
res.status(500).json({error:e.message});
}

});

router.post("/login", async(req,res)=>{

try{

const {usuario,password} = req.body;

const user = await User.findOne({usuario});

if(!user){
return res.status(404).json({msg:"Usuario no existe"});
}

const valido = await bcrypt.compare(password,user.password);

if(!valido){
return res.status(401).json({msg:"Contraseña incorrecta"});
}

const token = jwt.sign(
{id:user._id, rol:user.rol},
process.env.JWT_SECRET,
{expiresIn:"7d"}
);

res.json({
token,
usuario:user.nombre,
rol:user.rol,
foto:user.foto
});

}catch(e){
res.status(500).json({error:e.message});
}

});

module.exports = router;
