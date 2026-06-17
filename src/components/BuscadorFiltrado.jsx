import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const BuscadorFiltrado = ({ items, placeholder = "Buscar..." }) => {
  const [termino, setTermino] = useState('');
  const [tarjetaVolteada, setTarjetaVolteada] = useState(null); // Guarda el índice de la tarjeta volteada

  const itemsFiltrados = items.filter(item =>
    item.titulo.toLowerCase().includes(termino.toLowerCase()) ||
    item.descripcion.toLowerCase().includes(termino.toLowerCase())
  );

  const toggleFlip = (index) => {
    // Si la misma tarjeta ya está volteada, la cierra; si no, abre la nueva
    setTarjetaVolteada(tarjetaVolteada === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* Buscador */}
      <div className="relative mb-6">
        <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={termino}
          onChange={(e) => setTermino(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A6F5E] outline-none"
        />
        {termino && (
          <button onClick={() => setTermino('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>

      {/* Resultados */}
      {itemsFiltrados.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No se encontraron resultados para "{termino}"
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {itemsFiltrados.map((item, index) => {
            const isFlipped = tarjetaVolteada === index;
            return (
              <div
                key={index}
                className="relative h-64 w-full cursor-pointer perspective-1000"
                onClick={() => toggleFlip(index)}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                >
                  {/* FRENTE: Título + Icono */}
                  <div className="absolute w-full h-full backface-hidden bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition-shadow border border-gray-100 flex flex-col items-center justify-center text-center">
                    <div className="bg-gradient-to-br from-[#0F3B5C] to-[#1A6F5E] w-16 h-16 rounded-xl flex items-center justify-center text-white text-3xl mb-4 shadow-md">
                      <FontAwesomeIcon icon={item.icono} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{item.titulo}</h3>
                    <p className="text-xs text-gray-400 mt-2">🔃 Haz clic para ver más</p>
                  </div>

                  {/* DORSO: Descripción */}
                  <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl p-6 shadow-lg border border-[#1A6F5E] flex flex-col items-center justify-center text-center rotate-y-180">
                    <div className="bg-[#1A6F5E]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <FontAwesomeIcon icon={item.icono} className="text-[#1A6F5E] text-2xl" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{item.titulo}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.descripcion}</p>
                    <p className="text-xs text-gray-400 mt-3">🔃 Haz clic para cerrar</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Estilos adicionales para el flip */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default BuscadorFiltrado;