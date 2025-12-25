const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Pet = require('./models/Pet');
require('dotenv').config();

const app = express();

// 1. Conectar a Base de Datos
connectDB(); 

// 2. Middlewares
app.use(cors());
app.use(express.json());

// 3. Rutas
app.get('/', (req, res) => {
    res.json({ mensaje: "¡Servidor de Sasha funcionando!", status: "OK" });
});

app.get('/crear-prueba', async (req, res) => {
    try {
        const newPet = new Pet({ name: "Sasha Potosena." });
        await newPet.save();
        res.json({ mensaje: "¡Mascota nacida!", mascota: newPet });
    } catch (error) {
        
        res.status(500).json({ error: "Error al crear mascota" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
