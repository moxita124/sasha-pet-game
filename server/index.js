require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const Pet = require('./models/Pet'); 

const app = express();

// --- MIDDLEWARES (Configuraciones) ---
app.use(express.json()); // Entender JSON
app.use(cors());         // <--- Permitir que React se conecte

// --- BASE DE DATOS ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB Conectado"))
  .catch(err => console.error("🔴 Error Mongo:", err));

// --- RUTAS (Endpoints) ---

// 1. OBTENER A SASHA (Si no existe, la crea)
app.get('/api/pet', async (req, res) => {
  try {
    // Buscamos si ya existe una mascota
    let pet = await Pet.findOne();

    // Si no existe, creamos a Sasha automáticamente
    if (!pet) {
      pet = new Pet({
        name: "Sasha",
        hunger: 50,  // Empieza con hambre media
        energy: 100, // Empieza con energía a tope
        happiness: 100
      });
      await pet.save();
      console.log("✨ Sasha ha nacido en la base de datos");
    }

    res.json(pet); // Le enviamos la mascota a React
  } catch (error) {
    res.status(500).json({ error: "Error al buscar mascota" });
  }
});

// 2. DAR DE COMER (Ruta para el botón)
app.post('/api/pet/feed', async (req, res) => {
  try {
    const pet = await Pet.findOne();
    if (pet) {
      pet.hunger = Math.max(0, pet.hunger - 20); // Baja el hambre (mínimo 0)
      pet.happiness = Math.min(100, pet.happiness + 10); // Sube felicidad
      await pet.save(); // Guardamos cambios
      res.json(pet); // Devolvemos la mascota actualizada
    }
  } catch (error) {
    res.status(500).json({ error: "Error al alimentar" });
  }
});

const PORT = process.env.PORT || 5000;

// 3. JUGAR CON SASHA
app.post('/api/pet/play', async (req, res) => {
  try {
    const pet = await Pet.findOne();
    if (pet) {
      // Jugar cansa, da hambre, pero hace feliz
      pet.energy = Math.max(0, pet.energy - 10); 
      pet.hunger = Math.min(100, pet.hunger + 10);
      pet.happiness = Math.min(100, pet.happiness + 20);
      
      await pet.save();
      res.json(pet);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al jugar" });
  }
});

app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
