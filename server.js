const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Configuraciones de seguridad y tamaño
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Ruta del archivo (Compatible con Render y Local)
const RENDER_DISK = process.env.RENDER_DISK_PATH;
const archivoDatos = RENDER_DISK
    ? path.join(RENDER_DISK, 'datos_reciclaje.json')
    : path.join(__dirname, 'datos_reciclaje.json');

// Función para leer datos de forma segura
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

// RUTA POST: Recibir registros de Ionic
app.post('/api/reciclaje', (req, res) => {
    try {
        const { registros } = req.body;
        if (!registros) return res.status(400).send({ msg: "Sin datos" });

        const datosViejos = leerDatos();
        const datosNuevos = [...datosViejos, ...registros];

        fs.writeFileSync(archivoDatos, JSON.stringify(datosNuevos, null, 2));
        console.log("✅ Datos guardados con éxito");
        res.status(200).json({ mensaje: "Sincronizado" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// RUTA GET: Para que tú puedas ver los datos desde el navegador
app.get('/api/ver-datos', (req, res) => {
    const datos = leerDatos();
    res.json(datos);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Corriendo en puerto ${PORT}`));
