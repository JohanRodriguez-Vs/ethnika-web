import { useState } from 'react';
import { Link } from 'react-router-dom';

function ArtisanCard({ artisan = {} }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const {
    id = 'art-001',
    nombre = 'Artesano',
    ubicacion = 'Colombia',
    imagen = 'https://images.unsplash.com/photo-1552878917-5ff99ce58718?w=500&h=500&fit=crop',
    historia = '',
    productos = [],
  } = artisan;

  const handleImageError = () => setImageError(true);

  const imageSrc = imageError
    ? 'https://images.unsplash.com/photo-1552878917-5ff99ce58718?w=500&h=500&fit=crop'
    : imagen;

  return (
    <div
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full overflow-hidden rounded-lg bg-white shadow-md transition-all duration-500 hover:shadow-2xl transform hover:scale-105">
        <Link
          to={`/artesano/${id}`}
          className="relative block overflow-hidden bg-[#F5F3EF] aspect-[4/5]"
        >
          <img
            src={imageSrc}
            alt={nombre}
            onError={handleImageError}
            className={`h-full w-full object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />

          <div
            className={`absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent transition-opacity duration-500 ${
              isHovered ? 'opacity-60' : 'opacity-30'
            }`}
          />

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-playfair text-lg font-bold text-white drop-shadow-lg">
              {nombre}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-[#F5F3EF]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-[#C6A75E]"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {ubicacion}
            </p>
          </div>
        </Link>

        <div className="p-5">
          {historia && (
            <p className="mb-4 text-xs leading-relaxed text-[#999999] line-clamp-3">
              {historia}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="text-xs text-[#999999]">
              <span className="font-semibold text-[#1A1A1A]">{productos.length}</span>{' '}
              {productos.length === 1 ? 'producto' : 'productos'}
            </div>

            <Link
              to={`/artesano/${id}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C6A75E] transition-colors duration-300 hover:text-[#8B7355]"
            >
              Conocer más
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtisanCard;
