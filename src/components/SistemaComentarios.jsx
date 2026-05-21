import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faPaperPlane, faTrash, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const SistemaComentarios = ({ usuarioActual }) => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');

  // Cargar comentarios desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem('higea_comentarios');
    if (stored) {
      setComentarios(JSON.parse(stored));
    }
  }, []);

  // Guardar comentarios en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('higea_comentarios', JSON.stringify(comentarios));
  }, [comentarios]);

  const agregarComentario = () => {
    if (nuevoComentario.trim() === '') return;

    const nuevo = {
      id: Date.now(),
      texto: nuevoComentario.trim(),
      autor: usuarioActual ? usuarioActual : 'Anónimo',
      fecha: new Date().toLocaleString(),
    };
    setComentarios([nuevo, ...comentarios]);
    setNuevoComentario('');
  };

  const eliminarComentario = (id) => {
    setComentarios(comentarios.filter(c => c.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-12">
      <div className="flex items-center gap-3 mb-6">
        <FontAwesomeIcon icon={faComment} className="text-3xl text-[#1A6F5E]" />
        <h3 className="text-2xl font-bold text-gray-800">Opiniones de nuestros usuarios</h3>
      </div>

      <div className="mb-6">
        <textarea
          value={nuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
          placeholder="Escribe tu comentario o reseña..."
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A6F5E] outline-none"
        />
        <button
          onClick={agregarComentario}
          className="mt-2 bg-[#1A6F5E] text-white px-5 py-2 rounded-full hover:bg-[#0F3B5C] transition flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPaperPlane} /> Publicar comentario
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {comentarios.length === 0 && (
          <p className="text-gray-500 text-center py-4">No hay comentarios aún. ¡Sé el primero en opinar!</p>
        )}
        {comentarios.map((com) => (
          <div key={com.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUserCircle} className="text-[#1A6F5E] text-lg" />
                <span className="font-semibold text-gray-800">{com.autor}</span>
                <span className="text-xs text-gray-400">{com.fecha}</span>
              </div>
              <button
                onClick={() => eliminarComentario(com.id)}
                className="text-gray-400 hover:text-red-500 transition"
                title="Eliminar comentario"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <p className="text-gray-700">{com.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SistemaComentarios;