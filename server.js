const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// ruta raíz
app.get('/', (req, res) => {
    res.send('API de reciclaje funcionando');
});

// ruta archivo
const RENDER_DISK = process.env.RENDER_DISK_PATH;

const archivoDatos = RENDER_DISK
    ? path.join(RENDER_DISK, 'datos_reciclaje.json')
    : path.join(__dirname, 'datos_reciclaje.json');

// leer datos
const leerDatos = () => {
    try {
        if (!fs.existsSync(archivoDatos)) return [];
        const contenido = fs.readFileSync(archivoDatos, 'utf-8');
        return contenido ? JSON.parse(contenido) : [];
    } catch (error) {
        console.error("Error leyendo el archivo:", error);
        return [];
    }
};

// guardar registros
app.post('/api/reciclaje', (req, res) => {

    try {

        const { registros } = req.body;

        if (!registros) {
            return res.status(400).json({ msg: "Sin datos" });
        }

        const datosViejos = leerDatos();

        const datosNuevos = [...datosViejos, ...registros];

        fs.writeFileSync(archivoDatos, JSON.stringify(datosNuevos, null, 2));

        console.log("Datos guardados");

        res.status(200).json({ mensaje: "Sincronizado" });

    } catch (e) {

        res.status(500).json({ error: e.message });

    }

});

// ver datos
app.get('/api/ver-datos', (req, res) => {

    const datos = leerDatos();

    res.json(datos);

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Servidor corriendo en puerto ${PORT}`);

});
