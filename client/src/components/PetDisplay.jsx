const PetDisplay = ({ mood = 'happy' }) => {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center mt-10 scale-90 md:scale-100 transition-transform">
      
      {/* ================= SASHA (PASTOR ALEMÁN) ================= */}
      {/* (Esta parte no cambia, es la base) */}
      <div className="absolute bottom-0 w-32 h-24 bg-orange-700 rounded-b-3xl z-0"></div>

      <div className="relative w-44 h-40 bg-orange-500 rounded-3xl z-10 shadow-xl flex flex-col items-center justify-center border-b-4 border-orange-800">
        <div className="absolute -top-10 -left-2 w-14 h-24 bg-gray-800 rounded-tl-full rotate-[-20deg] border-4 border-orange-500 z-0"></div>
        <div className="absolute -top-10 -right-2 w-14 h-24 bg-gray-800 rounded-tr-full rotate-[20deg] border-4 border-orange-500 z-0"></div>

        <div className="flex gap-10 mt-2 z-20">
            <div className="w-5 h-5 bg-black rounded-full relative">
                <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
            <div className="w-5 h-5 bg-black rounded-full relative">
                <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
        </div>

        <div className="mt-2 w-20 h-14 bg-gray-900 rounded-xl flex flex-col items-center justify-center z-20">
            <div className="w-8 h-4 bg-black rounded-full mb-1"></div>
            <div className={`w-6 h-6 bg-pink-500 rounded-b-full ${mood === 'happy' ? 'animate-bounce' : ''}`}></div>
        </div>
      </div>

      {/* ================= SABUESO (OREJAS ARREGLADAS) ================= */}
      {/* Mantenemos la posición centrada que te gustó (right-20) */}
      
      <div className="absolute -top-0 right-20 w-20 h-20 z-30 flex flex-col items-center rotate-3">
        
        {/* --- AQUÍ ESTÁ EL CAMBIO DE LAS OREJAS --- */}
        {/* Usamos 'rounded-full' para que sean ovaladas completas y las bajamos (top-3) */}
        {/* Oreja Izquierda */}
        <div className="absolute top-3 -left-4 w-9 h-14 bg-amber-900 rounded-full z-0 rotate-12 border border-amber-950"></div>
        {/* Oreja Derecha */}
        <div className="absolute top-3 -right-2 w-9 h-14 bg-amber-900 rounded-full z-0 -rotate-12 border border-amber-950"></div>
        {/* ----------------------------------------- */}

        {/* CABEZA SABUESO */}
        <div className="w-16 h-14 bg-amber-700 rounded-2xl shadow-md relative flex flex-col items-center justify-center z-10 border-2 border-amber-800">
          <div className="flex gap-3 mb-1">
             <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
             <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
          </div>
          <div className="w-8 h-5 bg-amber-200 rounded-full flex justify-center items-center">
             <div className="w-2.5 h-1.5 bg-amber-900 rounded-full"></div>
          </div>

          {/* PATITAS */}
          <div className="absolute top-11 -left-3 w-7 h-4 bg-amber-700 rounded-full border-2 border-amber-900 rotate-45 z-40"></div>
          <div className="absolute top-11 -right-2 w-7 h-4 bg-amber-700 rounded-full border-2 border-amber-900 rotate-[-45deg] z-40"></div>
        </div>
      </div>

    </div>
  );
};

export default PetDisplay;