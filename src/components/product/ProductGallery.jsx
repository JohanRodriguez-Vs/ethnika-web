import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

/**
 * ProductGallery Component
 * 
 * Galería de imágenes premium cinematográfica para productos
 * Incluye:
 * - Imagen principal con zoom interactivo
 * - Carrusel de miniaturas navegables
 * - Indicadores visuales de progreso
 * - Animaciones suaves y fluidas
 * - Diseño responsive mobile-first
 * - Soporte para múltiples imágenes por variante
 */

const ProductGallery = ({ 
  images = [], 
  productName = 'Producto Artesanal',
  variant = null,
  onImageChange = null 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [thumbnailScroll, setThumbnailScroll] = useState(0);

  // Validar que tenemos imágenes
  const galleryImages = images && images.length > 0 ? images : [
    '/images/placeholder-product-1.jpg',
    '/images/placeholder-product-2.jpg',
    '/images/placeholder-product-3.jpg',
  ];

  const currentImage = galleryImages[currentImageIndex];
  const totalImages = galleryImages.length;

  // Manejo de cambio de imagen
  const goToImage = (index) => {
    setCurrentImageIndex(index);
    if (onImageChange) {
      onImageChange(index);
    }
  };

  const goToPrevious = () => {
    const newIndex = currentImageIndex === 0 ? totalImages - 1 : currentImageIndex - 1;
    goToImage(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentImageIndex === totalImages - 1 ? 0 : currentImageIndex + 1;
    goToImage(newIndex);
  };

  // Manejo de zoom
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentImageIndex, totalImages]);

  // Scroll de miniaturas
  const scrollThumbnails = (direction) => {
    const scrollAmount = direction === 'left' ? -100 : 100;
    setThumbnailScroll(prev => Math.max(0, prev + scrollAmount));
  };

  const visibleThumbnails = 4;
  const maxScroll = Math.max(0, (totalImages - visibleThumbnails) * 100);

  return (
    <div className="w-full">
      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex flex-col gap-4 lg:gap-6">
        
        {/* IMAGEN PRINCIPAL - HERO DEL PRODUCTO */}
        <div className="w-full">
          <div
            className="relative w-full aspect-square lg:aspect-[4/5] bg-gradient-to-br from-stone-50 to-stone-100 overflow-hidden group rounded-lg transition-all duration-500"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsZoomed(true)}
          >
            {/* IMAGEN CON ZOOM */}
            <img
              src={currentImage}
              alt={`${productName} - imagen ${currentImageIndex + 1}`}
              className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                isZoomed
                  ? 'scale-150 cursor-zoom-out'
                  : 'scale-100 cursor-zoom-in'
              }`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                    }
                  : {}
              }
            />

            {/* OVERLAY DEGRADADO SUTIL */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none" />

            {/* ÍCONO DE ZOOM - APARECE EN HOVER */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-lg">
                <ZoomIn size={20} className="text-stone-900" />
              </div>
            </div>

            {/* INDICADOR DE PROGRESO - LÍNEA ELEGANTE */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-stone-200/30">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500 ease-out"
                style={{
                  width: `${((currentImageIndex + 1) / totalImages) * 100}%`,
                }}
              />
            </div>

            {/* BOTONES DE NAVEGACIÓN - LADO IZQUIERDO */}
            {totalImages > 1 && (
              <button
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Imagen anterior"
              >
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all">
                  <ChevronLeft size={20} className="text-stone-900" strokeWidth={2.5} />
                </div>
              </button>
            )}

            {/* BOTONES DE NAVEGACIÓN - LADO DERECHO */}
            {totalImages > 1 && (
              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Siguiente imagen"
              >
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all">
                  <ChevronRight size={20} className="text-stone-900" strokeWidth={2.5} />
                </div>
              </button>
            )}

            {/* CONTADOR DE IMÁGENES */}
            <div className="absolute bottom-4 left-4 z-10">
              <div className="bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-medium">
                {currentImageIndex + 1} / {totalImages}
              </div>
            </div>
          </div>
        </div>

        {/* CARRUSEL DE MINIATURAS */}
        {totalImages > 1 && (
          <div className="w-full">
            <div className="flex items-center gap-2 lg:gap-3">
              {/* BOTÓN IZQUIERDA */}
              <button
                onClick={() => scrollThumbnails('left')}
                disabled={thumbnailScroll === 0}
                className="flex-shrink-0 p-2 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Desplazar miniaturas a la izquierda"
              >
                <ChevronLeft size={18} className="text-stone-700" />
              </button>

              {/* CONTENEDOR DE MINIATURAS */}
              <div className="flex-1 overflow-hidden">
                <div
                  className="flex gap-2 lg:gap-3 transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${thumbnailScroll}px)`,
                  }}
                >
                  {galleryImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 group relative ${
                        currentImageIndex === index
                          ? 'border-amber-500 shadow-lg scale-105'
                          : 'border-stone-200 hover:border-stone-300 hover:shadow-md'
                      }`}
                      aria-label={`Ver imagen ${index + 1}`}
                      aria-pressed={currentImageIndex === index}
                    >
                      {/* IMAGEN MINIATURA */}
                      <img
                        src={image}
                        alt={`Miniatura ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />

                      {/* OVERLAY CUANDO ESTÁ ACTIVO */}
                      {currentImageIndex === index && (
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-400/20 pointer-events-none" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* BOTÓN DERECHA */}
              <button
                onClick={() => scrollThumbnails('right')}
                disabled={thumbnailScroll >= maxScroll}
                className="flex-shrink-0 p-2 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Desplazar miniaturas a la derecha"
              >
                <ChevronRight size={18} className="text-stone-700" />
              </button>
            </div>

            {/* INDICADOR DE PUNTOS - ALTERNATIVA VISUAL */}
            <div className="mt-3 flex justify-center gap-1.5 lg:hidden">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentImageIndex === index
                      ? 'bg-stone-900 w-2 h-2'
                      : 'bg-stone-300 w-1.5 h-1.5 hover:bg-stone-400'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                  aria-pressed={currentImageIndex === index}
                />
              ))}
            </div>
          </div>
        )}

        {/* INFORMACIÓN TÉCNICA - PIE DE LA GALERÍA */}
        <div className="px-0 py-2 border-t border-stone-200 hidden lg:block">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-medium">Galería del producto</span>
            <span className="text-stone-400">
              Usa ← → para navegar • Haz hover en la imagen para zoom
            </span>
          </div>
        </div>
      </div>

      {/* ESTILOS PERSONALIZADOS PARA ZOOM */}
      <style jsx>{`
        /* Cursor personalizado para zoom */
        ::-webkit-scrollbar {
          height: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #d1c7b7;
          border-radius: 2px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #a8977d;
        }
      `}</style>
    </div>
  );
};

export default ProductGallery;
