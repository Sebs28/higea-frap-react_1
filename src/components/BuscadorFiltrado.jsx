import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const BuscadorFiltrado = ({ items, placeholder = "Buscar..." }) => {
  const [termino, setTermino] = useState('');

  const itemsFiltrados = items.filter(item =>
    item.titulo.toLowerCase().includes(termino.toLowerCase()) ||
    item.descripcion.toLowerCase().includes(termino.toLowerCase())
  );

  return (
    <div className="w-full">
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

      {itemsFiltrados.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No se encontraron resultados para "{termino}"
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {itemsFiltrados.map((item, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition border border-gray-100">
              <div className="bg-gradient-to-br from-[#0F3B5C] to-[#1A6F5E] w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl mb-4">
                <FontAwesomeIcon icon={item.icono} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.titulo}</h3>
              <p className="text-gray-500 text-sm">{item.descripcion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuscadorFiltrado;  // ← Esta línea es la que faltaba