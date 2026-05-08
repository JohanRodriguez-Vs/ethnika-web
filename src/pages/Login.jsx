import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Toast from '../components/ui/Toast';
import { validateEmail, validatePassword } from '../utils/validators';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user, loading: authLoading } = useAuth();

  // Obtener la URL de redirección (desde location state o localStorage)
  const getRedirectUrl = () => {
    // Primero revisar si hay un state en la ubicación
    if (location.state?.from) {
      return location.state.from;
    }
    
    // Luego revisar localStorage
    const savedUrl = localStorage.getItem('ethnika_redirect_url');
    if (savedUrl) {
      localStorage.removeItem('ethnika_redirect_url'); // Limpiar después de usar
      return savedUrl;
    }
    
    // Por defecto, ir al inicio
    return '/';
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (!authLoading && user && !isLoggingIn) {
      navigate('/');
    }
  }, [user, authLoading, navigate, isLoggingIn]);

  // Validación de formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'El correo es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Correo inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo de cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setToast({
        type: 'error',
        message: 'Por favor, completa todos los campos correctamente',
      });
      return;
    }

    setLoading(true);
    setIsLoggingIn(true);

    try {
      // Simular delay de autenticación
      await new Promise((resolve) => setTimeout(resolve, 800));

      const success = login(formData.email, formData.password);

      if (success) {
        setToast({
          type: 'success',
          message: '¡Bienvenido a ETHNIKA BY COL!',
        });

        setTimeout(() => {
          setIsLoggingIn(false);
          navigate(getRedirectUrl());
        }, 2500);
      } else {
        setIsLoggingIn(false);
        setToast({
          type: 'error',
          message: 'Correo o contraseña incorrectos',
        });
      }
    } catch (error) {
      setIsLoggingIn(false);
      setToast({
        type: 'error',
        message: 'Error al iniciar sesión. Intenta de nuevo.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Demo login (para pruebas rápidas)
  const handleDemoLogin = () => {
    setIsLoggingIn(true);
    setFormData({
      email: 'carolina@email.com',
      password: 'usuario123',
    });
    setTimeout(() => {
      const success = login('carolina@email.com', 'usuario123');
      if (success) {
        setToast({
          type: 'success',
          message: '¡Modo demo iniciado!',
        });
        setTimeout(() => {
          setIsLoggingIn(false);
          navigate(getRedirectUrl());
        }, 2500);
      } else {
        setIsLoggingIn(false);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3EF] to-[#FBF9F6] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Elemento decorativo de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A75E] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B7355] opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Contenedor principal */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo y título */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#C6A75E] to-[#8B7355] rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">Ξ</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-[#1A1A1A] font-playfair mb-2">
            ETHNIKA
          </h1>
          <p className="text-[#666666] text-sm font-light tracking-wide">
            Esencia que conecta
          </p>
        </div>

        {/* Tarjeta de login */}
        <div className="bg-white rounded-xl shadow-2xl p-8 backdrop-blur-sm border border-[#E8E6E1]">
          {/* Encabezado del formulario */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1A1A1A] font-playfair mb-2">
              Iniciar sesión
            </h2>
            <p className="text-[#999999] text-sm">
              Conecta con nosotros y explora el arte artesanal
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo de email */}
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@correo.com"
                error={errors.email}
                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 ${
                  errors.email
                    ? 'border-red-400 bg-red-50'
                    : 'border-[#E8E6E1] hover:border-[#D0CCBD]'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span className="text-red-600">⚠</span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Campo de contraseña */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#1A1A1A]">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-[#C6A75E] hover:text-[#8B7355] transition-colors"
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  error={errors.password}
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 ${
                    errors.password
                      ? 'border-red-400 bg-red-50'
                      : 'border-[#E8E6E1] hover:border-[#D0CCBD]'
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span className="text-red-600">⚠</span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Recordar contraseña */}
            <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#C6A75E] cursor-pointer"
                />
                <span className="text-sm text-[#666666]">Recuérdame</span>
              </label>
              <Link
                to="#"
                className="text-sm text-[#C6A75E] hover:text-[#8B7355] transition-colors font-medium"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Botón de envío */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-3 bg-gradient-to-r from-[#1A1A1A] to-[#333333] hover:from-[#C6A75E] hover:to-[#8B7355] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Conectando...</span>
                </>
              ) : (
                'Iniciar sesión'
              )}
            </Button>
          </form>

          {/* Divisor */}
          <div className="flex items-center gap-4 my-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex-1 h-px bg-[#E8E6E1]"></div>
            <span className="text-xs text-[#999999]">O</span>
            <div className="flex-1 h-px bg-[#E8E6E1]"></div>
          </div>

          {/* Botón de demo */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-3 border-2 border-[#E8E6E1] hover:border-[#C6A75E] text-[#1A1A1A] hover:text-[#C6A75E] font-semibold rounded-lg transition-all duration-300 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            Probar modo demo
          </button>

          {/* Enlace a registro */}
          <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm text-[#666666]">
              ¿No tienes cuenta?{' '}
              <Link
                to="/registro"
                className="text-[#C6A75E] hover:text-[#8B7355] font-semibold transition-colors"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>

          {/* Enlace a volver al inicio */}
          <div className="text-center mt-4 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <Link
              to="/"
              className="text-xs text-[#999999] hover:text-[#1A1A1A] transition-colors flex items-center justify-center gap-1"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>

        {/* Info de contacto artesanal */}
        <div className="mt-8 text-center text-xs text-[#999999] animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p>
            ¿Problemas para conectar?{' '}
            <a
              href="https://wa.me/573001234567?text=Ayuda%20con%20login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C6A75E] hover:text-[#8B7355] font-medium transition-colors"
            >
              Contacta por WhatsApp
            </a>
          </p>
        </div>
      </div>

      {/* Toast de notificación */}
      {toast && (
        <Toast
          open
          message={toast.message}
          type={toast.type}
          duration={2500}
          onClose={() => setToast(null)}
        />
      )}

      {/* Estilos de animación */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Login;
