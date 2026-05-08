import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavorites';
import Badge from '../ui/Badge';
import { ShoppingBag } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(product.id);

  // Manejo de errores de imagen
  const handleImageError = () => {
    setImageError(true);
  };

  // Imagen por defecto si hay error
  const getImageUrl = () => {
    if (imageError) {
      return 'https://images.unsplash.com/photo-1552878917-5ff99ce58718?w=500&h=500&fit=crop';
    }
    return product.imagen || 'https://images.unsplash.com/photo-1552878917-5ff99ce58718?w=500&h=500&fit=crop';
  };

  // Formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group relative h-full">
      {/* Contenedor de tarjeta */}
      <div
        className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col transform hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Sección de imagen */}
        <Link
          to={`/producto/${product.id}`}
          className="relative overflow-hidden bg-[#F5F3EF] aspect-square"
        >
          {/* Imagen del producto */}
          <img
            src={getImageUrl()}
            alt={product.nombre}
            loading="lazy"
            onError={handleImageError}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />

          {/* Overlay de gradiente */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-0 transition-opacity duration-500 ${
              isHovered ? 'opacity-40' : ''
            }`}
          ></div>

          {/* Badge de disponibilidad */}
          {product.disponibilidad === 'Limitada' && (
            <div className="absolute top-3 left-3 z-10">
              <Badge
                text="Stock limitado"
                variant="warning"
                className="bg-[#C6A75E] text-white text-xs font-semibold px-3 py-1"
              />
            </div>
          )}

          {product.destacado && (
            <div className="absolute top-2 left-2 z-10">
              <div className="bg-gradient-to-r from-[#C6A75E] to-[#8B7355] text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                Destacado
              </div>
            </div>
          )}

                  </Link>

        {/* Contenido de la tarjeta */}
        <div className="flex flex-1 flex-col p-3">
          {/* Contenedor con borde para la información */}
          <div className="flex flex-1 flex-col border border-[#E8E6E1] rounded-md p-4 bg-[#FAFAF8]">
            {/* Nombre del producto con favoritos */}
            <div className="flex items-start justify-between mb-1">
              <Link
                to={`/producto/${product.id}`}
                className="block hover:text-[#C6A75E] transition-colors flex-1"
              >
                <h3 className="text-lg font-bold text-[#1A1A1A] line-clamp-2 leading-tight">
                  {product.nombre}
                </h3>
              </Link>
              
              {/* Botón de favoritos estático */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(product.id);
                }}
                className={`ml-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isFavorite
                    ? 'bg-[#C6A75E] text-white'
                    : 'bg-[#F5F3EF] text-[#C6A75E] hover:bg-[#C6A75E] hover:text-white'
                } shadow-sm hover:shadow-md`}
                title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              >
                <svg
                  className="w-4 h-4"
                  fill={isFavorite ? 'currentColor' : 'none'}
                  stroke={isFavorite ? 'none' : 'currentColor'}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Artesano */}
            {product.artesano && (
              <Link
                to={`/artesano/${product.artesanoId}`}
                className="text-xs text-[#8B7355] hover:text-[#C6A75E] transition-colors font-medium mb-3"
              >
                Por {product.artesano}
              </Link>
            )}

            {/* Precio */}
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-lg font-bold text-[#1A1A1A]">
                {formatPrice(product.precio)}
              </span>
              {product.precioOriginal && product.precioOriginal > product.precio && (
                <span className="text-xs text-[#999999] line-through">
                  {formatPrice(product.precioOriginal)}
                </span>
              )}
            </div>

            {/* Variantes (Preview) */}
            {product.variantes && product.variantes.length > 0 && (
              <div className="mb-3">
                <div className="text-xs text-[#666666] font-medium">
                  {product.variantes.length} {product.variantes.length === 1 ? 'variante disponible' : 'variantes disponibles'}
                </div>
              </div>
            )}

            {/* Disponibilidad */}
            {product.stock > 0 && (
              <div className="text-xs mb-3 inline-block">
                <span className="bg-[#E8F5E9] text-[#2E7D32] px-2 py-1 rounded-full font-medium">
                  ● DISPONIBLE
                </span>
              </div>
            )}

            {/* Espaciador flexible */}
            <div className="flex-1"></div>

            {/* Botones de acción */}
            <div className="flex gap-2">
              <Link
                to={`/producto/${product.id}`}
                className="flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-300 text-white bg-[#1A1A1A] hover:bg-[#333333] text-center"
              >
                Ver detalles
              </Link>
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-300 bg-[#F5F3EF] text-[#1A1A1A] hover:bg-[#C6A75E] hover:text-white flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} />
                Añadir
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Brillo de fondo al hover */}
      <div
        className={`absolute inset-0 rounded-lg bg-gradient-to-r from-[#C6A75E] via-transparent to-[#8B7355] opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
      ></div>
    </div>
  );
};

export default ProductCard;
