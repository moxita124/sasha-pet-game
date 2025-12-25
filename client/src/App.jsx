import PetDisplay from "./components/PetDisplay";

function App() {
  return (
    <div className="min-h-screen bg-slate-200 flex flex-col items-center justify-center font-sans">
      <h1 className="text-4xl font-bold text-slate-700 mb-8 tracking-wider">
        SASHA VIRTUAL
      </h1>
      
      {/* El dibujo de Sasha */}
      <div className="bg-white p-10 rounded-full shadow-2xl border-8 border-white ring-4 ring-orange-200">
        <PetDisplay />
      </div>

      <div className="mt-10 flex gap-4">
        <button className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition">
            🍖 Comer
        </button>
        <button className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition">
            🎾 Jugar
        </button>
      </div>
    </div>
  )
}

export default App;
