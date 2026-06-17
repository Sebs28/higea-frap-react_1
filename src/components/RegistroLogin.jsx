import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faEnvelope, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const RegistroLogin = ({ onLoginExitoso }) => {
  const [modo, setModo] = useState('login');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [rfc, setRfc] = useState('');
  const [telefono, setTelefono] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [cargando, setCargando] = useState(false);

  // ===== VALIDACIONES =====
  const soloLetras = (texto) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(texto.trim());
  const validarNombre = (texto) => texto.trim().length >= 2 && soloLetras(texto);
  const validarApellidos = (texto) => texto.trim().length >= 2 && soloLetras(texto);
  const validarCorreo = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const validarPassword = (pass) => pass.length >= 6;
  const validarDomicilio = (texto) => texto.trim().length >= 5 && /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s#.,\-()]+$/.test(texto.trim());
  const validarCiudad = (texto) => texto.trim().length >= 3 && soloLetras(texto);
  const validarRFC = (rfc) => /^[A-Za-z0-9]{10}$/.test(rfc.trim());
  const validarTelefono = (tel) => /^[0-9]{10}$/.test(tel.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensajeExito('');
    setCargando(true);

    if (modo === 'registro') {
      if (!validarNombre(nombre)) {
        setError('El nombre debe tener al menos 2 letras y solo caracteres alfabéticos');
        setCargando(false);
        return;
      }
      if (!validarApellidos(apellidos)) {
        setError('Los apellidos deben tener al menos 2 letras y solo caracteres alfabéticos');
        setCargando(false);
        return;
      }
      if (!validarCorreo(correo)) {
        setError('Correo electrónico inválido');
        setCargando(false);
        return;
      }
      if (!validarPassword(password)) {
        setError('La contraseña debe tener al menos 6 caracteres');
        setCargando(false);
        return;
      }
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        setCargando(false);
        return;
      }
      if (!validarDomicilio(domicilio)) {
        setError('El domicilio debe tener al menos 5 caracteres y solo caracteres válidos');
        setCargando(false);
        return;
      }
      if (!validarCiudad(ciudad)) {
        setError('La ciudad debe tener al menos 3 letras y solo caracteres alfabéticos');
        setCargando(false);
        return;
      }
      if (!validarRFC(rfc)) {
        setError('El RFC debe tener exactamente 10 caracteres alfanuméricos (ej: ABC1234567)');
        setCargando(false);
        return;
      }
      if (!validarTelefono(telefono)) {
        setError('El teléfono debe tener exactamente 10 dígitos (ej: 7121288085)');
        setCargando(false);
        return;
      }
    } else {
      if (!validarCorreo(correo)) {
        setError('Correo electrónico inválido');
        setCargando(false);
        return;
      }
      if (password.length === 0) {
        setError('La contraseña es obligatoria');
        setCargando(false);
        return;
      }
    }

    // ===== URL DEL BACKEND EN RENDER  =====
    const API_URL = 'https://higea-backend.onrender.com/api/auth';

    const url = modo === 'registro'
      ? `${API_URL}/register`
      : `${API_URL}/login`;

    let body = {};
    if (modo === 'registro') {
      body = {
        nombre: nombre.trim(),
        apellidos: apellidos.trim(),
        correo: correo.trim(),
        password,
        domicilio: domicilio.trim(),
        ciudad: ciudad.trim(),
        rfc: rfc.trim(),
        telefono: telefono.trim(),
        empresa: empresa.trim(),
      };
    } else {
      body = {
        correo: correo.trim(),
        password
      };
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.mensaje || 'Error en la solicitud');
        setCargando(false);
        return;
      }

      if (modo === 'registro') {
        setMensajeExito('✅ Usuario registrado correctamente');
        setNombre('');
        setApellidos('');
        setCorreo('');
        setPassword('');
        setConfirmPassword('');
        setDomicilio('');
        setCiudad('');
        setRfc('');
        setTelefono('');
        setEmpresa('');
        setTimeout(() => {
          setMensajeExito('');
          setModo('login');
        }, 2000);
      } else {
        if (onLoginExitoso) {
          onLoginExitoso({ usuario: data.usuario.nombre, email: data.usuario.correo });
        }
      }
    } catch (error) {
      setError('Error de conexión con el servidor');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-md mx-auto p-6 max-h-[80vh] overflow-y-auto">
      <div className="flex gap-4 mb-6 border-b sticky top-0 bg-white z-10">
        <button
          onClick={() => { setModo('login'); setError(''); setMensajeExito(''); }}
          className={`pb-2 flex-1 text-center font-semibold ${modo === 'login' ? 'text-[#1A6F5E] border-b-2 border-[#1A6F5E]' : 'text-gray-500'}`}
        >
          <FontAwesomeIcon icon={faSignInAlt} /> Iniciar sesión
        </button>
        <button
          onClick={() => { setModo('registro'); setError(''); setMensajeExito(''); }}
          className={`pb-2 flex-1 text-center font-semibold ${modo === 'registro' ? 'text-[#1A6F5E] border-b-2 border-[#1A6F5E]' : 'text-gray-500'}`}
        >
          <FontAwesomeIcon icon={faUserPlus} /> Registrarse
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-800 p-2 rounded mb-4 text-sm">{error}</div>}
      {mensajeExito && (
        <div className="bg-green-100 text-green-800 p-2 rounded mb-4 text-sm flex items-center gap-2">
          <FontAwesomeIcon icon={faCheckCircle} /> {mensajeExito}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {modo === 'registro' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="mb-3">
                <label className="block text-gray-700 text-sm mb-1">Nombre *</label>
                <input 
                  type="text" 
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value)} 
                  required 
                  className="w-full p-2 border rounded-lg" 
                  disabled={cargando} 
                  placeholder="Ej: Juan"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm mb-1">Apellidos *</label>
                <input 
                  type="text" 
                  value={apellidos} 
                  onChange={(e) => setApellidos(e.target.value)} 
                  required 
                  className="w-full p-2 border rounded-lg" 
                  disabled={cargando} 
                  placeholder="Ej: Pérez García"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 text-sm mb-1">Correo electrónico *</label>
              <input 
                type="email" 
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)} 
                required 
                className="w-full p-2 border rounded-lg" 
                disabled={cargando} 
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="mb-3">
                <label className="block text-gray-700 text-sm mb-1">Contraseña *</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="w-full p-2 border rounded-lg" 
                  disabled={cargando} 
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm mb-1">Confirmar contraseña *</label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                  className="w-full p-2 border rounded-lg" 
                  disabled={cargando} 
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 text-sm mb-1">Domicilio *</label>
              <input 
                type="text" 
                value={domicilio} 
                onChange={(e) => setDomicilio(e.target.value)} 
                required 
                className="w-full p-2 border rounded-lg" 
                disabled={cargando} 
                placeholder="Calle 123, Colonia, Número"
              />
              <p className="text-xs text-gray-400 mt-1">Letras, números, #, ., ,, -, ( )</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="mb-3">
                <label className="block text-gray-700 text-sm mb-1">Ciudad *</label>
                <input 
                  type="text" 
                  value={ciudad} 
                  onChange={(e) => setCiudad(e.target.value)} 
                  required 
                  className="w-full p-2 border rounded-lg" 
                  disabled={cargando} 
                  placeholder="Ej: Jocotitlán"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm mb-1">RFC *</label>
                <input 
                  type="text" 
                  value={rfc} 
                  onChange={(e) => setRfc(e.target.value)} 
                  placeholder="Ej: ABC1234567" 
                  required 
                  maxLength="10" 
                  className="w-full p-2 border rounded-lg uppercase" 
                  disabled={cargando} 
                />
                <p className="text-xs text-gray-400 mt-1">10 caracteres alfanuméricos (letras y números)</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="mb-3">
                <label className="block text-gray-700 text-sm mb-1">Teléfono *</label>
                <input 
                  type="text" 
                  value={telefono} 
                  onChange={(e) => setTelefono(e.target.value)} 
                  placeholder="7121288085" 
                  required 
                  maxLength="10" 
                  className="w-full p-2 border rounded-lg" 
                  disabled={cargando} 
                />
                <p className="text-xs text-gray-400 mt-1">10 dígitos (solo números)</p>
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm mb-1">Empresa</label>
                <input 
                  type="text" 
                  value={empresa} 
                  onChange={(e) => setEmpresa(e.target.value)} 
                  className="w-full p-2 border rounded-lg" 
                  disabled={cargando} 
                  placeholder="Opcional"
                />
              </div>
            </div>
          </>
        )}

        {modo === 'login' && (
          <>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm mb-1">Correo electrónico</label>
              <input 
                type="email" 
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)} 
                required 
                className="w-full p-2 border rounded-lg" 
                disabled={cargando} 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-1">Contraseña</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="w-full p-2 border rounded-lg" 
                disabled={cargando} 
              />
            </div>
          </>
        )}

        <button 
          type="submit" 
          disabled={cargando} 
          className="w-full bg-[#0F3B5C] text-white py-2 rounded-lg font-semibold hover:bg-[#0A2B3F] transition disabled:opacity-50"
        >
          {cargando ? 'Procesando...' : (modo === 'login' ? 'Ingresar' : 'Registrarme')}
        </button>
      </form>
    </div>
  );
};

export default RegistroLogin;