import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faEnvelope, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const RegistroLogin = ({ onLoginExitoso }) => {
  const [modo, setModo] = useState('login');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [cargando, setCargando] = useState(false);

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegistro = () => {
    const usuarioTrim = usuario.trim();
    const emailTrim = email.trim();
    if (usuarioTrim.length < 3) return 'El usuario debe tener al menos 3 caracteres';
    if (!validarEmail(emailTrim)) return 'Correo electrónico inválido';
    if (password.length < 4) return 'La contraseña debe tener al menos 4 caracteres';
    if (password !== confirmPassword) return 'Las contraseñas no coinciden';

    if (localStorage.getItem(`higea_pass_${usuarioTrim}`)) {
      return 'El usuario ya está registrado. Inicia sesión.';
    }

    localStorage.setItem(`higea_pass_${usuarioTrim}`, password);
    localStorage.setItem(`higea_email_${usuarioTrim}`, emailTrim);
    const userData = { usuario: usuarioTrim, email: emailTrim };
    localStorage.setItem('higea_user_data', JSON.stringify(userData));
    return null; // éxito
  };

  const handleLogin = () => {
    const usuarioTrim = usuario.trim();
    const storedPass = localStorage.getItem(`higea_pass_${usuarioTrim}`);
    if (!storedPass) return 'El usuario no existe. Regístrate primero.';
    if (storedPass !== password) return 'Contraseña incorrecta.';
    const storedEmail = localStorage.getItem(`higea_email_${usuarioTrim}`) || '';
    const userData = { usuario: usuarioTrim, email: storedEmail };
    localStorage.setItem('higea_user_data', JSON.stringify(userData));
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensajeExito('');
    setCargando(true);

    let err = null;
    let exito = false;
    if (modo === 'registro') {
      err = handleRegistro();
      if (!err) {
        exito = true;
        setMensajeExito('Usuario registrado correctamente');
        setTimeout(() => {
          const usuarioTrim = usuario.trim();
          const emailTrim = email.trim();
          const userData = { usuario: usuarioTrim, email: emailTrim };
          if (onLoginExitoso) onLoginExitoso(userData);
        }, 1500);
      }
    } else {
      err = handleLogin();
      if (!err) {
        const usuarioTrim = usuario.trim();
        const storedEmail = localStorage.getItem(`higea_email_${usuarioTrim}`) || '';
        const userData = { usuario: usuarioTrim, email: storedEmail };
        if (onLoginExitoso) onLoginExitoso(userData);
      }
    }

    if (err) {
      setError(err);
      setCargando(false);
      return;
    }

    if (!exito && modo === 'login') {
      setUsuario('');
      setPassword('');
      setCargando(false);
    } else if (modo === 'registro' && exito) {
      setCargando(false);
    } else if (modo === 'registro' && !exito) {
      setCargando(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-md mx-auto p-6">
      <div className="flex gap-4 mb-6 border-b">
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
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
            disabled={cargando}
          />
        </div>

        {modo === 'registro' && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded-lg"
              disabled={cargando}
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
            disabled={cargando}
          />
        </div>

        {modo === 'registro' && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Confirmar contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border rounded-lg"
              disabled={cargando}
            />
          </div>
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