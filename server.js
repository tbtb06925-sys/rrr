const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');


const app = express();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB conectado"))
.catch(err => console.error(err));

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const uri = "TU_URI_DE_MONGODB";

const client = new MongoClient(uri);

let db;

async function conectarDB() {

    await client.connect();

    db = client.db("reciclajeDB");

    console.log("Conectado a MongoDB");

}

conectarDB();

app.get('/', (req, res) => {
    res.send("API funcionando");
});

app.post('/api/reciclaje', async (req, res) => {

    try {

        const { registros } = req.body;

        const collection = db.collection("registros");

        await collection.insertMany(registros);

        res.json({
            mensaje: "Datos guardados en MongoDB"
        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

});

app.get('/api/ver-datos', async (req, res) => {

    const collection = db.collection("registros");

    const datos = await collection.find().toArray();

    res.json(datos);

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("Servidor corriendo en puerto " + PORT);

});
