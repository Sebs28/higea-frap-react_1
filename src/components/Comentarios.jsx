import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faUser, faUserSecret, faClock, faTrash } from '@fortawesome/free-solid-svg-icons';

const Comentarios = ({ usuarioActual }) => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [cargando, setCargando] = useState(false);

  // Cargar comentarios desde localStorage al montar el componente
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    setCargando(true);
    const nuevo = {
      id: Date.now(),
      texto: nuevoComentario.trim(),
      autor: usuarioActual ? usuarioActual : 'Anónimo',
      fecha: new Date().toLocaleString(),
    };
    setComentarios([nuevo, ...comentarios]); // los nuevos arriba
    setNuevoComentario('');
    setCargando(false);
  };

  const eliminarComentario = (id) => {
    if (window.confirm('¿Eliminar este comentario?')) {
      setComentarios(comentarios.filter(c => c.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-12">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faComment} className="text-[#1A6F5E]" /> Comentarios y reseñas
      </h3>
      <p className="text-gray-500 text-sm mb-6">Comparte tu opinión sobre HIGEA. Tu comentario ayuda a mejorar.</p>

      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          rows="3"
          value={nuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
          placeholder={usuarioActual ? `Escribe tu comentario, ${usuarioActual}...` : "Escribe tu comentario (aparecerá como Anónimo)..."}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A6F5E] outline-none"
          required
        />
        <button
          type="submit"
          disabled={cargando}
          className="mt-3 bg-[#1A6F5E] text-white px-6 py-2 rounded-full hover:bg-[#0F3B5C] transition disabled:opacity-50"
        >
          {cargando ? 'Enviando...' : 'Publicar comentario'}
        </button>
      </form>

      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {comentarios.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No hay comentarios aún. ¡Sé el primero en opinar!</p>
        ) : (
          comentarios.map(com => (
            <div key={com.id} className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <FontAwesomeIcon icon={com.autor === 'Anónimo' ? faUserSecret : faUser} />
                  <span className="font-semibold text-gray-700">{com.autor}</span>
                  <span className="text-xs text-gray-400"><FontAwesomeIcon icon={faClock} className="mr-1" />{com.fecha}</span>
                </div>
                {/* Solo el usuario que lo escribió (o si está logueado y es admin, pero simplificamos: cualquiera puede eliminar? mejor solo el autor) */}
                {/* Para mantener simplicidad, permitimos eliminar solo si el nombre coincide con el usuario actual o si es admin (no implementado). 
                    Por ahora, cualquiera puede eliminar, pero se podría mejorar. */}
                <button onClick={() => eliminarComentario(com.id)} className="text-gray-400 hover:text-red-500 text-sm">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <p className="text-gray-700 mt-1">{com.texto}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comentarios;