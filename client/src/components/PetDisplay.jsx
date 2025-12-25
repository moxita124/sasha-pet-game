const PetDisplay = () => {
  return (
    <div className="relative w-60 h-60 flex items-center justify-center">
      
      {/* --- CUELLO --- */}
      <div className="absolute bottom-0 w-24 h-20 bg-orange-700 rounded-b-3xl z-0"></div>

      {/* --- CABEZA --- */}
      <div className="relative w-40 h-36 bg-orange-500 rounded-3xl z-10 shadow-xl flex flex-col items-center justify-center">
        
        {/* OREJAS --- */}
        <div className="absolute -top-8 -left-4 w-12 h-20 bg-gray-800 rounded-tl-full rotate-[-20deg] border-4 border-orange-500 z-0"></div>
        <div className="absolute -top-8 -right-4 w-12 h-20 bg-gray-800 rounded-tr-full rotate-[20deg] border-4 border-orange-500 z-0"></div>

        {/* OJOS --- */}
        <div className="flex gap-8 mt-4 z-20">
            <div className="w-4 h-4 bg-black rounded-full relative">
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <div className="w-4 h-4 bg-black rounded-full relative">
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
        </div>

        {/* HOCICO --- */}
        <div className="mt-2 w-16 h-12 bg-gray-900 rounded-xl flex flex-col items-center justify-center z-20">
            <div className="w-6 h-3 bg-black rounded-full mb-1"></div>
            <div className="w-4 h-4 bg-pink-500 rounded-b-full"></div>
        </div>

      </div>
    </div>
  );
};

export default PetDisplay;