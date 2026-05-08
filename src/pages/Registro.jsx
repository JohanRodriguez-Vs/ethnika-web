import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Toast from '../components/ui/Toast';
import { validateEmail, validatePassword } from '../utils/validators';

const Registro = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Validación de formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!acceptTerms) {
      newErrors.terms = 'Debes aceptar los términos y condiciones';
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

    try {
      // Simular delay de registro
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Aquí iría la lógica real de registro
      // Por ahora simulamos éxito
      setToast({
        type: 'success',
        message: '¡Registro exitoso! Redirigiendo al inicio de sesión...',
      });

      // Redirigir a login después de 1.5 segundos
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      setToast({
        type: 'error',
        message: 'Error al registrarse. Intenta de nuevo.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Indicador de fortaleza de contraseña
  const getPasswordStrength = () => {
    if (!formData.password) return null;
    
    let strength = 0;
    if (formData.password.length >= 6) strength++;
    if (formData.password.length >= 10) strength++;
    if (/[A-Z]/.test(formData.password)) strength++;
    if (/[0-9]/.test(formData.password)) strength++;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength++;

    if (strength <= 2) return { text: 'Débil', color: 'text-red-500', bgColor: 'bg-red-100' };
    if (strength <= 3) return { text: 'Media', color: 'text-yellow-500', bgColor: 'bg-yellow-100' };
    return { text: 'Fuerte', color: 'text-green-500', bgColor: 'bg-green-100' };
  };

  const passwordStrength = getPasswordStrength();

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
            Únete a nuestra comunidad artesanal
          </p>
        </div>

        {/* Tarjeta de registro */}
        <div className="bg-white rounded-xl shadow-2xl p-8 backdrop-blur-sm border border-[#E8E6E1]">
          {/* Encabezado del formulario */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1A1A1A] font-playfair mb-2">
              Crear cuenta
            </h2>
            <p className="text-[#999999] text-sm">
              Conecta con el arte artesanal colombiano
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo de nombre */}
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="name" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Nombre completo
              </label>
              <Input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Tu nombre"
                error={errors.name}
                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 ${
                  errors.name
                    ? 'border-red-400 bg-red-50'
                    : 'border-[#E8E6E1] hover:border-[#D0CCBD]'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span className="text-red-600">⚠</span>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Campo de email */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
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
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
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

              {/* Indicador de fortaleza */}
              {passwordStrength && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[#E8E6E1] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        passwordStrength.text === 'Débil'
                          ? 'w-1/3 bg-red-500'
                          : passwordStrength.text === 'Media'
                          ? 'w-2/3 bg-yellow-500'
                          : 'w-full bg-green-500'
                      }`}
                    ></div>
                  </div>
                  <span className={`text-xs font-medium ${passwordStrength.color}`}>
                    {passwordStrength.text}
                  </span>
                </div>
              )}

              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span className="text-red-600">⚠</span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Campo de confirmar contraseña */}
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#1A1A1A]">
                  Confirmar contraseña
                </label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-xs text-[#C6A75E] hover:text-[#8B7355] transition-colors"
                >
                  {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                error={errors.confirmPassword}
                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 ${
                  errors.confirmPassword
                    ? 'border-red-400 bg-red-50'
                    : 'border-[#E8E6E1] hover:border-[#D0CCBD]'
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span className="text-red-600">⚠</span>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Términos y condiciones */}
            <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    if (e.target.checked && errors.terms) {
                      setErrors((prev) => ({
                        ...prev,
                        terms: '',
                      }));
                    }
                  }}
                  className="w-5 h-5 accent-[#C6A75E] cursor-pointer mt-0.5"
                />
                <span className="text-xs text-[#666666] group-hover:text-[#1A1A1A] transition-colors">
                  Acepto los{' '}
                  <a href="#" className="text-[#C6A75E] hover:text-[#8B7355] font-medium transition-colors">
                    términos y condiciones
                  </a>
                  {' '}y la{' '}
                  <a href="#" className="text-[#C6A75E] hover:text-[#8B7355] font-medium transition-colors">
                    política de privacidad
                  </a>
                </span>
              </label>
              {errors.terms && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1 ml-8">
                  <span className="text-red-600">⚠</span>
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Botón de envío */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-3 bg-gradient-to-r from-[#1A1A1A] to-[#333333] hover:from-[#C6A75E] hover:to-[#8B7355] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              onClick={handleSubmit}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Registrando...</span>
                </>
              ) : (
                'Crear cuenta'
              )}
            </Button>
          </form>

          {/* Información adicional */}
          <div className="mt-6 pt-6 border-t border-[#E8E6E1] animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-xs text-[#999999] text-center mb-4">
              Tus datos serán almacenados de manera segura según nuestra política de privacidad
            </p>
          </div>

          {/* Enlace a login */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <p className="text-sm text-[#666666]">
              ¿Ya tienes cuenta?{' '}
              <Link
                to="/login"
                className="text-[#C6A75E] hover:text-[#8B7355] font-semibold transition-colors"
              >
                Inicia sesión
              </Link>
            </p>
          </div>

          {/* Enlace a volver al inicio */}
          <div className="text-center mt-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Link
              to="/"
              className="text-xs text-[#999999] hover:text-[#1A1A1A] transition-colors flex items-center justify-center gap-1"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>

        {/* Info de contacto artesanal */}
        <div className="mt-8 text-center text-xs text-[#999999] animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <p>
            ¿Preguntas sobre registro?{' '}
            <a
              href="https://wa.me/573001234567?text=Ayuda%20con%20registro"
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
          message={toast.message}
          type={toast.type}
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

export default Registro;
