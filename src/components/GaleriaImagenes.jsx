import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrash, faUpload, faWarning } from '@fortawesome/free-solid-svg-icons';

const GaleriaImagenes = () => {
  const [imagenes, setImagenes] = useState([]);
  const [error, setError] = useState('');

  const validarImagen = (file) => {
    const tiposValidos = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!tiposValidos.includes(file.type)) {
      setError('Formato no válido. Usa JPG, PNG o WEBP.');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no debe superar los 5MB.');
      return false;
    }
    setError('');
    return true;
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (validarImagen(file)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagenes(prev => [...prev, { id: Date.now() + Math.random(), url: reader.result, nombre: file.name }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const eliminarImagen = (id) => setImagenes(imagenes.filter(img => img.id !== id));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faImage} className="text-[#1A6F5E]" /> Galería de evidencias
      </h3>
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#1A6F5E] transition">
        <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" id="fileInput" />
        <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center gap-2">
          <FontAwesomeIcon icon={faUpload} className="text-4xl text-gray-400" />
          <span className="text-gray-500">Haz clic o arrastra imágenes aquí</span>
        </label>
      </div>
      {error && <div className="mt-4 bg-red-100 text-red-800 p-3 rounded flex items-center gap-2"><FontAwesomeIcon icon={faWarning} /> {error}</div>}
      {imagenes.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {imagenes.map(img => (
            <div key={img.id} className="relative group rounded-lg overflow-hidden border border-gray-200">
              <img src={img.url} alt={img.nombre} className="w-full h-32 object-cover" />
              <button onClick={() => eliminarImagen(img.id)} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition text-xs">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GaleriaImagenes;