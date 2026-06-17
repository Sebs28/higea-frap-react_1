import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, faTimes, faMapMarkerAlt, faEnvelope, faPhone, 
  faNotesMedical, faHistory, faChartLine, faTruckMedical, faFireExtinguisher,
  faDatabase, faMobileAlt, faLock, faMedal, faChartSimple, faWallet,
  faUserCircle, faSignOutAlt, faArrowUp, faHome,
  faBullseye, faEye, faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import logo from './assets/logo.jpeg';
import FormularioContacto from './components/FormularioContacto';
import BuscadorFiltrado from './components/BuscadorFiltrado';
import RegistroLogin from './components/RegistroLogin';
import SistemaComentarios from './components/SistemaComentarios';

const serviciosData = [
  { titulo: "Seguimiento de Paciente", descripcion: "Control integral del historial clínico y atención prehospitalaria en un solo lugar.", icono: faNotesMedical },
  { titulo: "Historial Clínico Digital", descripcion: "Acceso inmediato a reportes FRAP anteriores, evolución y tratamientos.", icono: faHistory },
  { titulo: "Informes en Tiempo Real", descripcion: "Dashboards ejecutivos con métricas de productividad y atención médica.", icono: faChartLine },
  { titulo: "Módulo Traslados", descripcion: "Gestión optimizada de traslados de ambulancia y seguimiento.", icono: faTruckMedical },
  { titulo: "Incidencias y Apoyo", descripcion: "Registro de incendios, apoyo comunitario y servicios de pipa integrados.", icono: faFireExtinguisher }
];

const PantallaBienvenida = ({ usuario, email, onIrAlInicio }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2B3F] to-[#1A4A6F] flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center transform transition-all animate-float">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FontAwesomeIcon icon={faUserCircle} className="text-5xl text-[#1A6F5E]" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Bienvenido, {usuario}!</h1>
        <p className="text-gray-600 mb-1">Has iniciado sesión correctamente.</p>
        {email && <p className="text-gray-500 text-sm mb-6"><FontAwesomeIcon icon={faEnvelope} className="mr-1" /> {email}</p>}
        <button onClick={onIrAlInicio} className="bg-[#1A6F5E] text-white px-6 py-2 rounded-full hover:bg-[#0F3B5C] transition flex items-center gap-2 mx-auto">
          <FontAwesomeIcon icon={faHome} /> Ir al inicio
        </button>
      </div>
    </div>
  );
};

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mostrarModalLogin, setMostrarModalLogin] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [emailLogueado, setEmailLogueado] = useState('');
  const [mostrarLanding, setMostrarLanding] = useState(false);
  const [mensajeSesion, setMensajeSesion] = useState({ texto: '', tipo: '' });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem('higea_user_data');
    if (storedUserData) {
      const { usuario, email } = JSON.parse(storedUserData);
      setUsuarioLogueado(usuario);
      setEmailLogueado(email || '');
      setMostrarLanding(true);
    } else {
      setMostrarLanding(false);
    }
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuAbierto(false);
  };

  const handleLoginExitoso = (userData) => {
    setUsuarioLogueado(userData.usuario);
    setEmailLogueado(userData.email || '');
    setMostrarModalLogin(false);
    setMostrarLanding(false);
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem('higea_user_data');
    setUsuarioLogueado(null);
    setEmailLogueado('');
    setMostrarLanding(false);
    setMensajeSesion({ texto: 'Sesión cerrada correctamente', tipo: 'success' });
    setTimeout(() => setMensajeSesion({ texto: '', tipo: '' }), 3000);
  };

  useEffect(() => {
    const handleScrollButton = () => {
      const btn = document.getElementById('btnVolverArriba');
      if (btn) {
        if (window.scrollY > 300) {
          btn.classList.remove('opacity-0', 'invisible');
          btn.classList.add('opacity-100', 'visible');
        } else {
          btn.classList.remove('opacity-100', 'visible');
          btn.classList.add('opacity-0', 'invisible');
        }
      }
    };
    window.addEventListener('scroll', handleScrollButton);
    return () => window.removeEventListener('scroll', handleScrollButton);
  }, []);

  const volverArriba = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (usuarioLogueado && !mostrarLanding) {
    return <PantallaBienvenida usuario={usuarioLogueado} email={emailLogueado} onIrAlInicio={() => setMostrarLanding(true)} />;
  }

  return (
    <div className="font-['Inter'] antialiased">
      {/* TOAST DE SESIÓN CERRADA */}
      {mensajeSesion.texto && (
        <div className="fixed top-20 right-5 z-50 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-out">
          <FontAwesomeIcon icon={faCheckCircle} />
          {mensajeSesion.texto}
        </div>
      )}

      {/* HEADER */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/98 shadow-md' : 'bg-white/95 backdrop-blur-md'}`}>
        <div className="container mx-auto px-5 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollTo('inicio')}>
            <img src={logo} alt="HIGEA Logo" className="w-10 h-10 rounded-xl object-cover border border-gray-200 shadow-sm" />
            <div>
              <h1 className="font-bold text-xl tracking-wider text-gray-800">H<span className="text-[#1A6F5E]"> I </span>G<span className="text-[#1A6F5E]"> E </span>A</h1>
              <p className="text-xs text-gray-500 -mt-1">Health Intelligence & Gestión de Emergencias</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" onClick={(e) => { e.preventDefault(); scrollTo('inicio'); }} className="nav-link text-gray-700 hover:text-[#1A6F5E] font-semibold">Inicio</a>
            <a href="#nosotros" onClick={(e) => { e.preventDefault(); scrollTo('nosotros'); }} className="nav-link text-gray-700 hover:text-[#1A6F5E] font-semibold">Nosotros</a>
            <a href="#servicios" onClick={(e) => { e.preventDefault(); scrollTo('servicios'); }} className="nav-link text-gray-700 hover:text-[#1A6F5E] font-semibold">Servicios</a>
            <a href="#sistema-frap" onClick={(e) => { e.preventDefault(); scrollTo('sistema-frap'); }} className="nav-link text-gray-700 hover:text-[#1A6F5E] font-semibold">Sistema FRAP</a>
            <a href="#beneficios" onClick={(e) => { e.preventDefault(); scrollTo('beneficios'); }} className="nav-link text-gray-700 hover:text-[#1A6F5E] font-semibold">Beneficios</a>
            <a href="#contacto" onClick={(e) => { e.preventDefault(); scrollTo('contacto'); }} className="nav-link text-gray-700 hover:text-[#1A6F5E] font-semibold">Contacto</a>
            {usuarioLogueado ? (
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                <FontAwesomeIcon icon={faUserCircle} className="text-[#1A6F5E] text-lg" />
                <span className="text-sm font-semibold text-gray-700">{usuarioLogueado}</span>
                <button onClick={handleCerrarSesion} className="text-xs text-gray-500 hover:text-red-500 ml-1">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
              </div>
            ) : (
              <button onClick={() => setMostrarModalLogin(true)} className="bg-[#1A6F5E] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#0F3B5C] transition flex items-center gap-2">
                <FontAwesomeIcon icon={faUserCircle} /> Acceder
              </button>
            )}
          </div>
          <div className="md:hidden flex items-center gap-4">
            {usuarioLogueado ? (
              <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
                <FontAwesomeIcon icon={faUserCircle} className="text-[#1A6F5E] text-sm" />
                <span className="text-xs font-semibold text-gray-700 truncate max-w-[80px]">{usuarioLogueado}</span>
                <button onClick={handleCerrarSesion} className="text-xs text-gray-500 hover:text-red-500">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
              </div>
            ) : (
              <button onClick={() => setMostrarModalLogin(true)} className="bg-[#1A6F5E] text-white px-3 py-1 rounded-full text-xs font-semibold">Acceder</button>
            )}
            <button onClick={() => setMenuAbierto(!menuAbierto)} className="text-2xl text-gray-700">
              <FontAwesomeIcon icon={menuAbierto ? faTimes : faBars} />
            </button>
          </div>
        </div>
        {menuAbierto && (
          <div className="md:hidden bg-white border-t py-4 px-5 flex flex-col space-y-3 shadow-lg">
            <a href="#inicio" onClick={(e) => { e.preventDefault(); scrollTo('inicio'); }} className="text-gray-800 hover:text-[#1A6F5E] font-medium">Inicio</a>
            <a href="#nosotros" onClick={(e) => { e.preventDefault(); scrollTo('nosotros'); }} className="text-gray-800 hover:text-[#1A6F5E] font-medium">Nosotros</a>
            <a href="#servicios" onClick={(e) => { e.preventDefault(); scrollTo('servicios'); }} className="text-gray-800 hover:text-[#1A6F5E] font-medium">Servicios</a>
            <a href="#sistema-frap" onClick={(e) => { e.preventDefault(); scrollTo('sistema-frap'); }} className="text-gray-800 hover:text-[#1A6F5E] font-medium">Sistema FRAP</a>
            <a href="#beneficios" onClick={(e) => { e.preventDefault(); scrollTo('beneficios'); }} className="text-gray-800 hover:text-[#1A6F5E] font-medium">Beneficios</a>
            <a href="#contacto" onClick={(e) => { e.preventDefault(); scrollTo('contacto'); }} className="text-gray-800 hover:text-[#1A6F5E] font-medium">Contacto</a>
          </div>
        )}
      </nav>

      <main>
        {/* INICIO */}
        <section id="inicio" className="gradient-bg text-white pt-32 pb-20 md:pt-36 md:pb-28 relative overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#B3E4D7]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1A6F5E]/20 rounded-full blur-3xl"></div>
          <div className="container mx-auto px-5 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                  <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
                  <i className="fas fa-chart-line mr-1 text-green-400"></i> +150 instituciones confían en HIGEA
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
                  Digitaliza la atención <span className="gradient-text">prehospitalaria</span><br />con el Sistema <span className="text-[#B3E4D7]">FRAP</span>
                </h1>
                <p className="text-lg text-white/80 mb-8 max-w-lg">Tan fácil de implementar que tu institución estará generando reportes médicos digitales en tiempo récord. Rápido, seguro y compatible con estándares internacionales.</p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3"><i className="fas fa-check-circle text-green-400 text-sm w-5"></i><span className="text-white/90">Usado por más de 50 instituciones de salud en México</span></div>
                  <div className="flex items-center gap-3"><i className="fas fa-check-circle text-green-400 text-sm w-5"></i><span className="text-white/90">Optimizado para dispositivos móviles y tablets</span></div>
                  <div className="flex items-center gap-3"><i className="fas fa-check-circle text-green-400 text-sm w-5"></i><span className="text-white/90">Generación automática de reportes con IA</span></div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => scrollTo('contacto')} className="bg-white text-[#0F3B5C] px-8 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition flex items-center gap-2">Empezar ahora</button>
                  <button onClick={() => scrollTo('sistema-frap')} className="border-2 border-white/70 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition flex items-center gap-2">Ver demostración</button>
                </div>
                <div className="flex gap-8 mt-10 pt-4 border-t border-white/20">
                  <div><div className="text-2xl font-bold text-[#B3E4D7]">98%</div><div className="text-xs text-white/60">Satisfacción del cliente</div></div>
                  <div><div className="text-2xl font-bold text-[#B3E4D7]">24/7</div><div className="text-xs text-white/60">Soporte técnico</div></div>
                  <div><div className="text-2xl font-bold text-[#B3E4D7]">ISO 27001</div><div className="text-xs text-white/60">Certificación</div></div>
                </div>
              </div>
              <div className="relative animate-float">
                <div className="hero-card rounded-2xl p-3 shadow-2xl">
                  <img src={logo} alt="FRAP System" className="rounded-xl w-full" />
                  <div className="mt-4 flex justify-between items-center px-2">
                    <span className="text-white/60 text-xs font-mono">FRAP System v2.0</span>
                    <span className="text-green-400 text-xs flex items-center gap-1"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span> Sistema activo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NOSOTROS */}
        <section id="nosotros" className="py-20 bg-[#EFF7F5]">
          <div className="container mx-auto px-5 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[#1A6F5E] font-semibold tracking-wide uppercase">Quiénes somos</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Innovación tecnológica para el sector salud</h2>
              <div className="w-20 h-1 bg-[#1A6F5E] mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-2xl shadow-lg card-hover text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <FontAwesomeIcon icon={faBullseye} className="text-4xl text-[#0F3B5C]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Misión</h3>
                <p className="text-gray-600 leading-relaxed">Desarrollar soluciones tecnológicas innovadoras enfocadas en el sector salud, mediante software especializado que facilite la generación, gestión y almacenamiento de reportes médicos tipo FRAP, optimizando procesos clínicos y administrativos.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg card-hover text-center">
                <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <FontAwesomeIcon icon={faEye} className="text-4xl text-[#1A6F5E]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Visión</h3>
                <p className="text-gray-600 leading-relaxed">Consolidarnos como empresa líder en software para gestión de información clínica, destacando por soluciones confiables e innovadoras, contribuyendo a la digitalización de la atención prehospitalaria en México.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="py-20 bg-white">
          <div className="container mx-auto px-5 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[#1A6F5E] font-semibold uppercase tracking-wider">Soluciones integrales</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Nuestros Servicios</h2>
              <p className="text-gray-500 mt-4">Módulos diseñados para potenciar la gestión clínica y administrativa.</p>
            </div>
            <BuscadorFiltrado items={serviciosData} placeholder="Buscar servicio (ej: paciente, traslados)..." />
          </div>
        </section>

        {/* ==================== SISTEMA FRAP (ACTUALIZADO) ==================== */}
        <section id="sistema-frap" className="py-20 bg-gradient-to-br from-[#EFF7F5] to-white">
          <div className="container mx-auto px-5 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="bg-[#1A6F5E]/10 text-[#1A6F5E] px-4 py-1 rounded-full text-sm font-semibold">Formato FRAP Digital</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4 mb-5">Sistema especializado en reportes de Atención Prehospitalaria</h2>
                <p className="text-gray-600 mb-4">El sistema FRAP digitaliza el registro de atención prehospitalaria, permitiendo documentar urgencias médicas de forma rápida, estandarizada y segura, desde el primer contacto hasta el traslado hospitalario.</p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <i className="fas fa-check-circle text-[#1A6F5E] mt-1"></i>
                    <span>Elimina errores de legibilidad y omisión de datos críticos.</span>
                  </li>
                  <li className="flex gap-3">
                    <i className="fas fa-check-circle text-[#1A6F5E] mt-1"></i>
                    <span>Interoperable con estándares HL7 e ISO 27001 para seguridad total.</span>
                  </li>
                  <li className="flex gap-3">
                    <i className="fas fa-check-circle text-[#1A6F5E] mt-1"></i>
                    <span>Genera estadísticas operativas automáticas para la toma de decisiones.</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button 
                    onClick={() => scrollTo('contacto')} 
                    className="bg-[#1A6F5E] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#0F3B5C] transition shadow-md hover:shadow-lg inline-flex items-center gap-2"
                  >
                    <i className="fas fa-file-alt"></i> Ver descripción
                  </button>
                  <p className="text-xs text-gray-400 mt-2">Conoce cómo el sistema FRAP optimiza la atención prehospitalaria</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4 justify-start">
                  <div className="bg-white rounded-xl shadow p-3 text-center min-w-[100px] flex-1 max-w-[120px]">
                    <FontAwesomeIcon icon={faDatabase} className="text-2xl text-[#0F3B5C] mb-1 block" />
                    <p className="font-bold text-xs">Backend robusto</p>
                  </div>
                  <div className="bg-white rounded-xl shadow p-3 text-center min-w-[100px] flex-1 max-w-[120px]">
                    <FontAwesomeIcon icon={faMobileAlt} className="text-2xl text-[#0F3B5C] mb-1 block" />
                    <p className="font-bold text-xs">Responsive</p>
                  </div>
                  <div className="bg-white rounded-xl shadow p-3 text-center min-w-[100px] flex-1 max-w-[120px]">
                    <FontAwesomeIcon icon={faLock} className="text-2xl text-[#0F3B5C] mb-1 block" />
                    <p className="font-bold text-xs">Confidencialidad</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100">
                <div className="bg-gray-800 rounded-xl p-4 text-white font-mono text-sm">
                  <p className="text-green-300">&gt; Sistema FRAP :: HIGEA</p>
                  <p className="text-gray-300">[INFO] Módulo de autenticación activo</p>
                  <p className="text-gray-300">[INFO] API RESTful endpoints activos</p>
                  <div className="mt-3 bg-gray-700 p-2 rounded">
                    <span className="text-blue-300">Registro reciente:</span>
                    <div className="flex justify-between text-xs">
                      <span>Paciente: J.Pérez</span>
                      <span>FRAP-2409</span>
                      <span className="text-yellow-300">Prioridad: Alta</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFICIOS */}
        <section id="beneficios" className="py-20 bg-gray-50">
          <div className="container mx-auto px-5 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <FontAwesomeIcon icon={faMedal} className="text-3xl text-[#1A6F5E]" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Ventajas competitivas</h2>
              <p className="text-gray-500 mt-3">Implementar HIGEA transforma la gestión clínica y administrativa.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="benefit-card bg-white p-6 rounded-2xl text-center shadow-md border-b-4 border-[#1A6F5E] transition-all hover:shadow-xl"><FontAwesomeIcon icon={faChartLine} className="text-4xl text-[#0F3B5C] mb-4" /><h3 className="font-bold text-xl mb-2">Aumento de clientes</h3><p className="text-gray-500 text-sm">Visibilidad digital mejorada.</p></div>
              <div className="benefit-card bg-white p-6 rounded-2xl text-center shadow-md border-b-4 border-[#1A6F5E] transition-all hover:shadow-xl"><FontAwesomeIcon icon={faChartLine} className="text-4xl text-[#0F3B5C] mb-4" /><h3 className="font-bold text-xl mb-2">Generación de ventas</h3><p className="text-gray-500 text-sm">Estrategias de marketing conversional.</p></div>
              <div className="benefit-card bg-white p-6 rounded-2xl text-center shadow-md border-b-4 border-[#1A6F5E] transition-all hover:shadow-xl"><FontAwesomeIcon icon={faChartSimple} className="text-4xl text-[#0F3B5C] mb-4" /><h3 className="font-bold text-xl mb-2">Posicionamiento digital</h3><p className="text-gray-500 text-sm">SEO y presencia profesional.</p></div>
              <div className="benefit-card bg-white p-6 rounded-2xl text-center shadow-md border-b-4 border-[#1A6F5E] transition-all hover:shadow-xl"><FontAwesomeIcon icon={faWallet} className="text-4xl text-[#0F3B5C] mb-4" /><h3 className="font-bold text-xl mb-2">Reducción de costos</h3><p className="text-gray-500 text-sm">Automatización de reportes.</p></div>
            </div>
          </div>
        </section>

        {/* CONTACTO (sin Galería de Evidencias) */}
        <section id="contacto" className="py-20 bg-white">
          <div className="container mx-auto px-5 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Hablemos de innovación</h2>
                <p className="text-gray-600 mb-6">Solicita una demostración del sistema FRAP o recibe información personalizada para tu institución médica.</p>
                <div className="space-y-5">
                  <div className="flex items-center gap-4"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-2xl text-[#1A6F5E]" /><span>Tecnológico de Estudios Superiores de Jocotitlán</span></div>
                  <div className="flex items-center gap-4"><FontAwesomeIcon icon={faEnvelope} className="text-2xl text-[#1A6F5E]" /><span>higea802@gmail.com</span></div>
                  <div className="flex items-center gap-4"><FontAwesomeIcon icon={faPhone} className="text-2xl text-[#1A6F5E]" /><span>+52 712 128 8085</span></div>
                  <div className="flex gap-6 pt-4">
                    <a href="https://www.facebook.com/share/18MXAw6KBS/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#1877F2] text-2xl transition"><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href="https://www.instagram.com/h_i_g_e_a?igsh=MXY0NmNpZ3dnZHZxcg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#E4405F] text-2xl transition"><FontAwesomeIcon icon={faInstagram} /></a>
                    <a href="https://www.tiktok.com/@h.i.g.e.a?_r=1&_t=ZS-95Z5qmmoXVI" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#000000] text-2xl transition"><FontAwesomeIcon icon={faTiktok} /></a>
                  </div>
                </div>
              </div>
              <FormularioContacto titulo="Formulario de contacto" />
            </div>
            <SistemaComentarios usuarioActual={usuarioLogueado} />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0A2B3F] text-gray-300 py-12">
        <div className="container mx-auto px-5 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div><div className="flex items-center gap-2"><img src={logo} alt="HIGEA" className="w-9 h-9 rounded-lg object-cover" /><span className="font-bold text-white text-lg tracking-wider">H I G E A</span></div><p className="text-sm mt-3">Sistema FRAP para el sector salud, desarrollado con tecnologías web modernas.</p></div>
            <div><h4 className="text-white font-semibold mb-3">Enlaces</h4><ul className="space-y-2 text-sm"><li><a href="#inicio" onClick={(e) => { e.preventDefault(); scrollTo('inicio'); }} className="hover:text-white transition">Inicio</a></li><li><a href="#servicios" onClick={(e) => { e.preventDefault(); scrollTo('servicios'); }} className="hover:text-white transition">Servicios</a></li><li><a href="#sistema-frap" onClick={(e) => { e.preventDefault(); scrollTo('sistema-frap'); }} className="hover:text-white transition">Sistema FRAP</a></li></ul></div>
            <div><h4 className="text-white font-semibold mb-3">Políticas</h4><ul className="space-y-2 text-sm"><li>Confidencialidad de datos</li><li>ISO 27001</li><li>NOM-004-SSA3-2012</li></ul></div>
            <div><h4 className="text-white font-semibold mb-3">Proyecto escolar</h4><p className="text-sm">Ing. Sistemas Computacionales - Tecnológico de Jocotitlán. Marzo 2026.</p><p className="text-xs mt-2">© 2026 HIGEA - Desarrollo web promocional FRAP</p></div>
          </div>
        </div>
      </footer>

      {/* BOTÓN VOLVER ARRIBA */}
      <button
        id="btnVolverArriba"
        onClick={volverArriba}
        className="fixed bottom-6 right-6 bg-[#1A6F5E] text-white w-14 h-14 rounded-full shadow-2xl hover:bg-[#0F3B5C] transition-all duration-300 z-50 opacity-0 invisible hover:scale-110 flex items-center justify-center"
        aria-label="Volver arriba"
      >
        <FontAwesomeIcon icon={faArrowUp} className="text-xl" />
      </button>

      {/* MODAL LOGIN */}
      {mostrarModalLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setMostrarModalLogin(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-0 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-xl font-bold text-gray-800">Acceso a tu cuenta</h3>
              <button onClick={() => setMostrarModalLogin(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            <div className="p-6">
              <RegistroLogin onLoginExitoso={handleLoginExitoso} />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .gradient-bg { background: linear-gradient(135deg, #0A2B3F 0%, #1A4A6F 100%); }
        .gradient-text { background: linear-gradient(135deg, #B3E4D7 0%, #7AB2D3 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .hero-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); }
        .nav-link { position: relative; transition: color 0.3s ease; }
        .nav-link::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 0; height: 2px; background: #1A6F5E; transition: width 0.3s ease; }
        .nav-link:hover::after { width: 100%; }
        .card-hover, .service-card, .benefit-card { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
        .card-hover:hover, .service-card:hover, .benefit-card:hover { transform: translateY(-5px); box-shadow: 0 15px 25px -10px rgba(0,0,0,0.1); }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        #btnVolverArriba { transition: opacity 0.3s, visibility 0.3s; }
        .opacity-0 { opacity: 0; }
        .opacity-100 { opacity: 1; }
        .invisible { visibility: hidden; }
        .visible { visibility: visible; }
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateX(20px); }
          15% { opacity: 1; transform: translateX(0); }
          85% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(20px); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 3s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default App;