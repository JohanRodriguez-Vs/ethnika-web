import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3EF] to-[#FBF9F6] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#C6A75E] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#8B7355] opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Contenedor principal */}
      <div className="max-w-2xl w-full relative z-10 text-center">
        {/* Animación del número 404 */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-block relative">
            <h1 className="text-[200px] md:text-[280px] font-bold font-playfair text-transparent bg-clip-text bg-gradient-to-r from-[#C6A75E] to-[#8B7355] leading-none">
              404
            </h1>
            <div className="absolute inset-0 text-[200px] md:text-[280px] font-bold font-playfair text-[#C6A75E] opacity-10 blur-md leading-none">
              404
            </div>
          </div>
        </div>

        {/* Título principal */}
        <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] font-playfair mb-3">
            Ruta no encontrada
          </h2>
          <p className="text-lg text-[#666666] font-light leading-relaxed">
            Parece que esta página no existe en el universo artesanal de ETHNIKA BY COL.
          </p>
        </div>

        {/* Mensaje emocional */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="inline-block px-6 py-4 bg-white rounded-lg border-2 border-[#E8E6E1] shadow-lg">
            <p className="text-[#8B7355] font-medium text-sm">
              "Cada camino tiene su destino, y este no es el tuyo"
            </p>
          </div>
        </div>

        {/* Elemento visual minimalista */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="relative w-32 h-32 mx-auto mb-8">
            {/* Líneas decorativas */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 128 128"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Brújula minimalista */}
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="#C6A75E"
                strokeWidth="2"
                opacity="0.3"
              />
              <circle
                cx="64"
                cy="64"
                r="45"
                stroke="#C6A75E"
                strokeWidth="1.5"
                opacity="0.2"
              />
              <line
                x1="64"
                y1="20"
                x2="64"
                y2="108"
                stroke="#C6A75E"
                strokeWidth="1.5"
                opacity="0.4"
              />
              <line
                x1="20"
                y1="64"
                x2="108"
                y2="64"
                stroke="#C6A75E"
                strokeWidth="1.5"
                opacity="0.4"
              />
              {/* Punto central */}
              <circle cx="64" cy="64" r="4" fill="#C6A75E" />
            </svg>

            {/* Icono de brújula */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl animate-pulse">↗</div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-4 mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Link to="/" className="block">
            <Button className="w-full py-4 bg-gradient-to-r from-[#1A1A1A] to-[#333333] hover:from-[#C6A75E] hover:to-[#8B7355] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
              Volver al inicio
            </Button>
          </Link>

          <Link to="/tienda" className="block">
            <Button className="w-full py-4 border-2 border-[#C6A75E] text-[#C6A75E] hover:text-white hover:bg-[#C6A75E] font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
              Explorar tienda
            </Button>
          </Link>
        </div>

        {/* Enlaces adicionales */}
        <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <p className="text-sm text-[#999999] mb-4">O navega a otras secciones:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/artesanos"
              className="px-4 py-2 text-[#C6A75E] hover:text-[#8B7355] hover:underline transition-colors font-medium text-sm"
            >
              Artesanos
            </Link>
            <span className="text-[#E8E6E1]">•</span>
            <Link
              to="/favoritos"
              className="px-4 py-2 text-[#C6A75E] hover:text-[#8B7355] hover:underline transition-colors font-medium text-sm"
            >
              Favoritos
            </Link>
            <span className="text-[#E8E6E1]">•</span>
            <a
              href="#contact"
              className="px-4 py-2 text-[#C6A75E] hover:text-[#8B7355] hover:underline transition-colors font-medium text-sm"
            >
              Contacto
            </a>
          </div>
        </div>

        {/* Footer informativo */}
        <div className="mt-12 pt-8 border-t border-[#E8E6E1] animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-xs text-[#999999] mb-4">
            ¿Necesitas ayuda? Contacta con nuestro equipo
          </p>
          <a
            href="https://wa.me/573001234567?text=Necesito%20ayuda"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-[#C6A75E] hover:text-[#8B7355] font-medium text-sm transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.773 1.149c-1.408.71-2.614 1.787-3.285 3.172-.67 1.385-.854 2.936-.517 4.428.337 1.492 1.162 2.861 2.37 3.88 1.208 1.02 2.738 1.604 4.372 1.75 1.634.146 3.295-.276 4.623-1.218l.03-.018c.276-.174.553-.346.828-.525l.104-.063c.288-.173.57-.36.845-.552l.098-.061c.354-.22.695-.452 1.025-.691l.08-.062c.285-.227.555-.462.81-.704.247-.232.48-.476.695-.726.22-.26.42-.525.6-.791.106-.157.206-.318.3-.479.183-.306.348-.614.491-.923.12-.261.224-.525.312-.789.068-.212.125-.422.17-.63.08-.35.125-.703.133-1.055-.008-.305-.043-.607-.104-.903-.135-.661-.414-1.293-.814-1.843-.393-.544-.912-1.014-1.515-1.347-.608-.337-1.282-.531-1.972-.57z" />
            </svg>
            Escribir por WhatsApp
          </a>
        </div>
      </div>

      {/* Estilos de animación */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
