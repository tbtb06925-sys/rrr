
const express = require("express");
const router = express.Router();

const Registro = require("../models/Registro");

router.post("/", async(req,res)=>{

try{

const registro = new Registro(req.body);

await registro.save();

res.json({msg:"Registro guardado"});

}catch(e){
res.status(500).json({error:e.message});
}

});

router.get("/", async(req,res)=>{

const datos = await Registro.find();

res.json(datos);

});

router.get("/estadisticas", async(req,res)=>{

const datos = await Registro.aggregate([
{
$group:{
_id:"$material",
total:{$sum:"$cantidad"}
}
}
]);

res.json(datos);

});

module.exports = router;
