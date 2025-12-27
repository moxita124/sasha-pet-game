import { useState, useEffect } from 'react'; 
import PetDisplay from "./components/PetDisplay";

function App() {
  // Estado para guardar los datos de Sasha
  const [pet, setPet] = useState(null);

  // Función para pedir los datos al servidor
  const fetchPet = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pet');
      const data = await response.json();
      setPet(data); // Guardamos los datos en el estado
    } catch (error) {
      console.error("Error conectando con Sasha:", error);
    }
  };

  // useEffect ejecuta esto al cargar la página por primera vez
  useEffect(() => {
    fetchPet();
  }, []);

  // Función para el botón "Comer"
  const handleFeed = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pet/feed', {
        method: 'POST' // Es una acción, así que usamos POST
      });
      const updatedPet = await response.json();
      setPet(updatedPet); // Actualizamos la vista con los nuevos datos
    } catch (error) {
      console.error("Error al comer:", error);
    }
  };

  // Función para el botón "Jugar"
  const handlePlay = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pet/play', {
        method: 'POST'
      });
      const updatedPet = await response.json();
      setPet(updatedPet);
    } catch (error) {
      console.error("Error al jugar:", error);
    }
  };

  // Si aún no cargan los datos, mostramos "Cargando..."
  if (!pet) return <div className="text-center mt-20">Despertando a Sasha... 😴</div>;

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col items-center justify-center font-sans">
      
      <h1 className="text-4xl font-bold text-slate-700 mb-4 tracking-wider">
        {pet.name.toUpperCase()} VIRTUAL
      </h1>

      {/* ESTADÍSTICAS REALES */}
      <div className="flex gap-8 mb-8 text-slate-600 font-bold bg-white px-8 py-2 rounded-full shadow-sm">
        <p>🍖 Hambre: <span className={pet.hunger > 80 ? "text-red-500" : "text-green-500"}>{pet.hunger}%</span></p>
        <p>⚡ Energía: {pet.energy}%</p>
        <p>❤️ Felicidad: {pet.happiness}%</p>
      </div>

      {/* DIBUJO */}
      <div className="bg-white p-10 rounded-full shadow-2xl border-8 border-white ring-4 ring-orange-200">
        <PetDisplay />
      </div>

      {/* BOTONES */}
      <div className="mt-10 flex gap-4">
        {/* BOTÓN COMER */}
        <button 
          onClick={handleFeed}
          className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition active:scale-95"
        >
            🍖 Comer
        </button>

        {/* BOTÓN JUGAR (ARREGLADO) */}
        <button 
          onClick={handlePlay} 
          className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition active:scale-95"
        >
            🎾 Jugar
        </button>
      </div>

    </div>
  )
}

export default App;