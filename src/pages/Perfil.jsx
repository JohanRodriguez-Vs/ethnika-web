import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Toast from '../components/ui/Toast';
import { validateEmail, validatePhone, isRequired } from '../utils/validators';
import { generateWhatsAppMessageForUser, generateWhatsAppUrl } from '../utils/generateWhatsAppMessage';
import { WHATSAPP_NUMBER } from '../utils/constants';
import { User, Mail, Phone, Save, ArrowLeft } from 'lucide-react';

const Perfil = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, login } = useAuth();
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user) {
      setFormData({
        nombre: user.nombre || '',
        email: user.email || '',
        telefono: user.telefono || '',
      });
    }
  }, [user, isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};

    const nameErr = isRequired(formData.nombre, 'El nombre');
    if (nameErr) newErrors.nombre = nameErr;

    if (!formData.email) {
      newErrors.email = 'El correo es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Correo inválido';
    }

    if (formData.telefono && !validatePhone(formData.telefono)) {
      newErrors.telefono = 'Teléfono inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSave = async (e) => {
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
      // Simular actualización en el backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar datos del usuario en localStorage
      const updatedUser = {
        ...user,
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
      };
      
      localStorage.setItem('ethnika_user', JSON.stringify(updatedUser));
      
      // Forzar recarga de la página para actualizar el contexto
      window.location.reload();
      
      setToast({
        type: 'success',
        message: '¡Datos actualizados correctamente!',
      });
      
      setIsEditing(false);
    } catch (error) {
      setToast({
        type: 'error',
        message: 'Error al actualizar los datos. Intenta de nuevo.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        nombre: user.nombre,
        email: user.email,
        telefono: user.telefono,
      });
    }
    setErrors({});
    setIsEditing(false);
  };

  const formatWhatsAppMessage = () => {
    const message = encodeURIComponent(
      generateWhatsAppMessageForUser(user)
    );
    return generateWhatsAppUrl(WHATSAPP_NUMBER, message);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3EF] to-[#FBF9F6] py-12 px-4 sm:px-6 lg:px-8">
      {/* Elemento decorativo de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A75E] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B7355] opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#666666] hover:text-[#1A1A1A] transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Volver al inicio
          </button>
          
          <div className="text-center">
            <div className="inline-block mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-[#C6A75E] to-[#8B7355] rounded-full flex items-center justify-center shadow-lg">
                <User size={36} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-[#1A1A1A] font-playfair mb-2">
              Mi Perfil
            </h1>
            <p className="text-[#666666] text-sm">
              Gestiona tu información personal y preferencias de contacto
            </p>
          </div>
        </div>

        {/* Tarjeta de perfil */}
        <div className="bg-white rounded-xl shadow-2xl p-8 backdrop-blur-sm border border-[#E8E6E1]">
          {/* Información actual */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1A1A1A] font-playfair">
                Información Personal
              </h2>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm"
                >
                  Editar perfil
                </Button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-6">
                {/* Campo de nombre */}
                <Input
                  id="nombre"
                  name="nombre"
                  label="Nombre completo"
                  leftIcon={<User size={16} />}
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Tu nombre completo"
                  error={errors.nombre}
                  required
                />

                {/* Campo de email */}
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  leftIcon={<Mail size={16} />}
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@correo.com"
                  error={errors.email}
                  required
                />

                {/* Campo de teléfono */}
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  label="Teléfono (opcional)"
                  leftIcon={<Phone size={16} />}
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="+57 300 123 4567"
                  error={errors.telefono}
                />

                {/* Botones de acción */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    {loading ? 'Guardando...' : 'Guardar cambios'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleCancel}
                    disabled={loading}
                    className="px-6"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-[#F5F3EF] rounded-lg">
                  <User size={20} className="text-[#C6A75E]" />
                  <div>
                    <p className="text-sm text-[#666666]">Nombre completo</p>
                    <p className="font-medium text-[#1A1A1A]">{formData.nombre}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#F5F3EF] rounded-lg">
                  <Mail size={20} className="text-[#C6A75E]" />
                  <div>
                    <p className="text-sm text-[#666666]">Correo electrónico</p>
                    <p className="font-medium text-[#1A1A1A]">{formData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#F5F3EF] rounded-lg">
                  <Phone size={20} className="text-[#C6A75E]" />
                  <div>
                    <p className="text-sm text-[#666666]">Teléfono</p>
                    <p className="font-medium text-[#1A1A1A]">
                      {formData.telefono || 'No especificado'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contacto WhatsApp */}
          <div className="border-t border-[#E8E6E1] pt-6">
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
              Contacto rápido
            </h3>
            <p className="text-sm text-[#666666] mb-4">
              ¿Necesitas ayuda? Contáctanos directamente por WhatsApp con tu información prellenada.
            </p>
            <a
              href={formatWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0011.99 0C5.378 0 0 5.379 0 12c0 2.114.553 4.115 1.518 5.842L0 24l6.188-1.624A11.828 11.828 0 0012 22.88h.005c6.612 0 11.99-5.378 11.99-11.99a11.843 11.843 0 00-3.531-8.502"/>
              </svg>
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Toast de notificación */}
      {toast && (
        <Toast
          open
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Perfil;
