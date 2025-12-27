import { useState } from 'react';
import './index.css';
import './App.css';

function App() {
  const [screen, setScreen] = useState('welcome');
  const [feedFeedback, setFeedFeedback] = useState({ show: false, pet: null, text: '' });
  
  // Estados de los minijuegos
  const [petCleanliness, setPetCleanliness] = useState({ pet1: false, pet2: false });
  const [score, setScore] = useState(0); // Puntos del juego
  const [isBallThrown, setIsBallThrown] = useState(false); // ¿La pelota está volando?

  // --- ESTADO DEL FORMULARIO ---
  const [formData, setFormData] = useState({
    ownerName: '',
    pet1Name: '',
    pet1Breed: '',
    pet2Name: '',
    pet2Breed: ''
  });
  
  const breeds = [
    { id: 'labrador', img: '/razas/labrador.png', name: 'Labrador' },
    { id: 'pug',      img: '/razas/pug.png',      name: 'Pug' }, 
    { id: 'pastor',   img: '/razas/pastor1.png',  name: 'Pastor Alemán' }
  ];

  const foodItems = [
    { id: 'Carne', icon: '🍖', name: 'Carne' },
    { id: 'Zanahoria', icon: '🥕', name: 'Zanahoria' },
    { id: 'Agua', icon: '💧', name: 'Agua' },
    { id: 'Galleta', icon: '🍪', name: 'Galleta' }
  ];

  const bathTools = [
    { id: 'Sponge', icon: '🧽', name: 'Esponja' },
    { id: 'Soap', icon: '🧼', name: 'Jabón' }
  ];

  const getBreedImage = (breedId) => {
    const breed = breeds.find(b => b.id === breedId);
    return breed ? breed.img : null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const selectBreed = (petNumber, breedId) => {
    setFormData({ ...formData, [`pet${petNumber}Breed`]: breedId });
  };

  const handleStart = () => {
    if (!formData.ownerName || !formData.pet1Name || !formData.pet2Name || !formData.pet1Breed || !formData.pet2Breed) {
      alert("¡Por favor completa todos los campos!");
      return;
    }
    setScreen('home'); 
  };

  // --- LÓGICA DE JUEGO (PATIO) ---
  const throwBall = () => {
    if (isBallThrown) return; // Si ya la lanzaste, espera

    setIsBallThrown(true); // Activa animación de pelota

    // Después de 1 segundo (cuando la pelota cae)
    setTimeout(() => {
        setScore(score + 10); // Ganas 10 puntos
        setFeedFeedback({ show: true, pet: 'both', text: '¡Buen tiro! +10' });
        setIsBallThrown(false); // La pelota regresa
        
        // Ocultar mensaje
        setTimeout(() => setFeedFeedback({ show: false, pet: null, text: '' }), 1500);
    }, 1000);
  };

  // --- LÓGICA DRAG & DROP ---
  const handleDragStart = (e, itemName, type) => {
    e.dataTransfer.setData("itemName", itemName);
    e.dataTransfer.setData("itemType", type); 
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, petKey, petName) => {
    e.preventDefault();
    const itemName = e.dataTransfer.getData("itemName");
    const itemType = e.dataTransfer.getData("itemType");
    
    if (itemType === 'food') {
        setFeedFeedback({ show: true, pet: petName, text: `¡Ñam! 😋 (${itemName})` });
        setTimeout(() => setFeedFeedback({ show: false, pet: null, text: '' }), 2000);
    }

    if (itemType === 'tool') {
        if (petCleanliness[petKey] === false) {
            setPetCleanliness({ ...petCleanliness, [petKey]: true }); 
            setFeedFeedback({ show: true, pet: petName, text: `¡Limpio! ✨` });
            setTimeout(() => setFeedFeedback({ show: false, pet: null, text: '' }), 2000);
        } else {
            setFeedFeedback({ show: true, pet: petName, text: `¡Ya estoy limpio! 😄` });
            setTimeout(() => setFeedFeedback({ show: false, pet: null, text: '' }), 2000);
        }
    }
  };

  return (
    <div id="app-container">
      
      {/* --- PANTALLA 1: BIENVENIDA --- */}
      {screen === 'welcome' && (
        <section id="welcome-screen" className="screen active">
          <div className="overlay"></div>
          <div className="content-box">
            <h1>Bienvenido a Casa</h1>
            <p className="subtitle">Donde la amistad crece</p>
            <button className="btn-primary" onClick={() => setScreen('register')}>
              COMENZAR NUESTRA VIDA JUNTOS
            </button>
          </div>
        </section>
      )}

      {/* --- PANTALLA 2: REGISTRO --- */}
      {screen === 'register' && (
         <section id="register-screen" className="screen active">
            <div className="register-card">
              <h2>¡Vamos a conocernos!</h2>
              <div className="form-group">
                <label>Tu Nombre:</label>
                <input type="text" name="ownerName" placeholder="¿Cómo te llamas?" value={formData.ownerName} onChange={handleInputChange} />
              </div>
              <div className="pet-section">
                <h3>🐶 Perrito 1</h3>
                <input type="text" name="pet1Name" placeholder="Nombre..." value={formData.pet1Name} onChange={handleInputChange} />
                <div className="breed-options">
                  {breeds.map((breed) => (
                    <div key={breed.id} className={`breed-icon ${formData.pet1Breed === breed.id ? 'selected' : ''}`} onClick={() => selectBreed(1, breed.id)}>
                      <img src={breed.img} alt={breed.name} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="pet-section">
                <h3>🐶 Perrito 2</h3>
                <input type="text" name="pet2Name" placeholder="Nombre..." value={formData.pet2Name} onChange={handleInputChange} />
                <div className="breed-options">
                  {breeds.map((breed) => (
                    <div key={breed.id} className={`breed-icon ${formData.pet2Breed === breed.id ? 'selected' : ''}`} onClick={() => selectBreed(2, breed.id)}>
                       <img src={breed.img} alt={breed.name} />
                    </div>
                  ))}
                </div>
              </div>
              <button className="btn-primary full-width" onClick={handleStart}>¡TODO LISTO! ENTRAR A CASA</button>
            </div>
         </section>
      )}

      {/* --- PANTALLA 3: LA CASA --- */}
      {screen === 'home' && (
        <section id="house-screen" className="screen active">
            <div className="house-header">
              <h2>Hola, {formData.ownerName}</h2>
            </div>
            <div className="living-room-floor">
              <div className="pet-container">
                <img src={getBreedImage(formData.pet1Breed)} alt={formData.pet1Name} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet1Name}</p>
              </div>
              <div className="pet-container">
                <img src={getBreedImage(formData.pet2Breed)} alt={formData.pet2Name} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet2Name}</p>
              </div>
            </div>
            <div className="nav-bar">
                <button className="nav-btn kitchen" onClick={() => setScreen('kitchen')}>
                    🍖 <span className="btn-label">Comer</span>
                </button>
                <button className="nav-btn bathroom" onClick={() => setScreen('bathroom')}>
                    🛁 <span className="btn-label">Bañar</span>
                </button>
                <button className="nav-btn garden" onClick={() => setScreen('garden')}>
                    🎾 <span className="btn-label">Jugar</span>
                </button>
            </div>
        </section>
      )}

      {/* --- PANTALLA 4: COCINA --- */}
      {screen === 'kitchen' && (
        <section id="kitchen-screen" className="screen active">
            <button className="back-btn" onClick={() => setScreen('home')}>⬅ Volver</button>
            <div className="kitchen-floor">
              <div className="pet-container" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'pet1', formData.pet1Name)}>
                {feedFeedback.show && feedFeedback.pet === formData.pet1Name && <div className="feedback-bubble">{feedFeedback.text}</div>}
                <img src={getBreedImage(formData.pet1Breed)} alt={formData.pet1Name} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet1Name}</p>
              </div>
              <div className="pet-container" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'pet2', formData.pet2Name)}>
                {feedFeedback.show && feedFeedback.pet === formData.pet2Name && <div className="feedback-bubble">{feedFeedback.text}</div>}
                <img src={getBreedImage(formData.pet2Breed)} alt={formData.pet2Name} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet2Name}</p>
              </div>
            </div>
            <div className="food-bar">
                {foodItems.map((food) => (
                    <div key={food.id} className="food-item" draggable={true} onDragStart={(e) => handleDragStart(e, food.name, 'food')}>
                        {food.icon}
                    </div>
                ))}
            </div>
        </section>
      )}

      {/* --- PANTALLA 5: BAÑO --- */}
      {screen === 'bathroom' && (
        <section id="bathroom-screen" className="screen active">
            <button className="back-btn" onClick={() => setScreen('home')}>⬅ Volver</button>
            <div className="bathroom-floor">
              <div className={`pet-container ${!petCleanliness.pet1 ? 'pet-dirty' : ''}`} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'pet1', formData.pet1Name)}>
                {!petCleanliness.pet1 && <div className="dirt-icon">🪰</div>}
                {feedFeedback.show && feedFeedback.pet === formData.pet1Name && <div className="feedback-bubble">{feedFeedback.text}</div>}
                <img src={getBreedImage(formData.pet1Breed)} alt={formData.pet1Name} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet1Name}</p>
              </div>
              <div className={`pet-container ${!petCleanliness.pet2 ? 'pet-dirty' : ''}`} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'pet2', formData.pet2Name)}>
                {!petCleanliness.pet2 && <div className="dirt-icon">🪰</div>}
                {feedFeedback.show && feedFeedback.pet === formData.pet2Name && <div className="feedback-bubble">{feedFeedback.text}</div>}
                <img src={getBreedImage(formData.pet2Breed)} alt={formData.pet2Name} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet2Name}</p>
              </div>
            </div>
            <div className="tools-bar">
                {bathTools.map((tool) => (
                    <div key={tool.id} className="tool-item" draggable={true} onDragStart={(e) => handleDragStart(e, tool.name, 'tool')}>
                        {tool.icon}
                    </div>
                ))}
            </div>
        </section>
      )}

      {/* --- PANTALLA 6: PATIO (GAME) --- */}
      {screen === 'garden' && (
        <section id="garden-screen" className="screen active">
            <button className="back-btn" onClick={() => setScreen('home')}>⬅ Volver</button>
            
            {/* Marcador */}
            <div className="score-board">Puntos: {score}</div>
            
            {/* Mensaje de feedback central */}
            {feedFeedback.show && feedFeedback.pet === 'both' && (
                 <div className="feedback-bubble" style={{top: '30%', left: '50%', transform: 'translateX(-50%)', fontSize: '1.5rem'}}>
                    {feedFeedback.text}
                 </div>
            )}

            <div className="garden-floor">
              {/* Clase condicional: Si se lanza la pelota, los perros saltan (pet-jump) */}
              <div className={`pet-container ${isBallThrown ? 'pet-jump' : ''}`}>
                <img src={getBreedImage(formData.pet1Breed)} alt={formData.pet1Name} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet1Name}</p>
              </div>
              <div className={`pet-container ${isBallThrown ? 'pet-jump' : ''}`}>
                <img src={getBreedImage(formData.pet2Breed)} alt={formData.pet2Name} className="pet-sprite" />
                <p className="pet-name-tag">{formData.pet2Name}</p>
              </div>
            </div>

            {/* La Pelota Interactiva */}
            <div 
                className={`ball ${isBallThrown ? 'thrown' : ''}`} 
                onClick={throwBall}
            >
                🎾
            </div>
        </section>
      )}

    </div>
  );
}

export default App;