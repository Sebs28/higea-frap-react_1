import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const FormularioContacto = ({ titulo = "Formulario de contacto" }) => {
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', mensaje: '' });
  const [mensajeEstado, setMensajeEstado] = useState({ texto: '', tipo: '' });
  const [errores, setErrores] = useState({});

  const validarCampo = (nombre, valor) => {
    if (nombre === 'nombre' && !valor.trim()) return 'El nombre es obligatorio';
    if (nombre === 'email') {
      if (!valor.trim()) return 'El correo es obligatorio';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return 'Correo electrónico inválido';
    }
    if (nombre === 'mensaje' && !valor.trim()) return 'El mensaje es obligatorio';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const error = validarCampo(name, value);
    setErrores({ ...errores, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    Object.keys(formData).forEach(key => {
      const error = validarCampo(key, formData[key]);
      if (error) nuevosErrores[key] = error;
    });
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setMensajeEstado({ texto: 'Por favor corrige los errores del formulario', tipo: 'error' });
      setTimeout(() => setMensajeEstado({ texto: '', tipo: '' }), 4000);
      return;
    }
    // Simular envío exitoso (solo un ícono, sin texto duplicado)
    setMensajeEstado({ texto: '¡Mensaje enviado! Un asesor se comunicará pronto.', tipo: 'success' });
    setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
    setErrores({});
    setTimeout(() => setMensajeEstado({ texto: '', tipo: '' }), 5000);
  };

  return (
    <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">{titulo}</h3>

      {mensajeEstado.texto && (
        <div className={`p-3 rounded mb-4 flex items-center gap-2 ${mensajeEstado.tipo === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <FontAwesomeIcon icon={mensajeEstado.tipo === 'success' ? faCheckCircle : faExclamationCircle} />
          <span>{mensajeEstado.texto}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre completo"
            className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#1A6F5E] outline-none ${errores.nombre ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errores.nombre && <p className="text-red-500 text-xs mt-1">{errores.nombre}</p>}
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#1A6F5E] outline-none ${errores.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errores.email && <p className="text-red-500 text-xs mt-1">{errores.email}</p>}
        </div>

        <div className="mb-4">
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Teléfono (opcional)"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A6F5E] outline-none"
          />
        </div>

        <div className="mb-5">
          <textarea
            name="mensaje"
            rows="3"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Mensaje"
            className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#1A6F5E] outline-none ${errores.mensaje ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errores.mensaje && <p className="text-red-500 text-xs mt-1">{errores.mensaje}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-[#0F3B5C] text-white py-3 rounded-xl font-bold hover:bg-[#0A2B3F] transition flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faPaperPlane} /> Enviar mensaje
        </button>
      </form>
    </div>
  );
};

export default FormularioContacto;