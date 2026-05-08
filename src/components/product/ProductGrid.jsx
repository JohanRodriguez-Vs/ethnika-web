import { useMemo } from 'react';
import ProductCard from './ProductCard';
import EmptyState from '../common/EmptyState';
import Loader from '../ui/Loader';

const ProductGrid = ({
  products = [],
  onAddToCart,
  loading = false,
  error = null,
  columns = { mobile: 1, tablet: 2, desktop: 3, lg: 4 },
  spacing = 'gap-6',
  showAnimation = true,
}) => {
  // Validar que los productos sean un array
  const validProducts = useMemo(() => {
    return Array.isArray(products) ? products : [];
  }, [products]);

  // Generar clases de columnas responsivas
  const getGridClasses = () => {
    let gridClass = 'grid w-full';

    // Grid base (mobile)
    gridClass += ` grid-cols-${columns.mobile}`;

    // Tablet
    gridClass += ` sm:grid-cols-${columns.tablet}`;

    // Desktop
    gridClass += ` lg:grid-cols-${columns.desktop}`;

    // Extra large
    if (columns.lg) {
      gridClass += ` xl:grid-cols-${columns.lg}`;
    }

    // Espaciado
    gridClass += ` ${spacing}`;

    return gridClass;
  };

  // Estado de carga
  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-16">
        <Loader />
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="w-full py-16">
        <EmptyState
          title="Error al cargar productos"
          description={error || 'Ocurrió un error al cargar los productos. Por favor, intenta de nuevo.'}
          icon="⚠️"
        />
      </div>
    );
  }

  // Estado vacío
  if (validProducts.length === 0) {
    return (
      <div className="w-full py-16">
        <EmptyState
          title="No hay productos"
          description="No encontramos productos que coincidan con tu búsqueda. Intenta con otros filtros."
          icon="🔍"
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Grid de productos */}
      <div className={`${getGridClasses()} auto-rows-max`}>
        {validProducts.map((product, index) => (
          <div
            key={product.id || index}
            className={`animate-fade-in ${showAnimation ? `opacity-0` : `opacity-100`}`}
            style={
              showAnimation
                ? {
                    animation: `fadeIn 0.6s ease-out forwards`,
                    animationDelay: `${index * 0.1}s`,
                  }
                : {}
            }
          >
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
            />
          </div>
        ))}
      </div>

      {/* Contador de productos */}
      <div className="mt-12 text-center">
        <p className="text-sm text-[#999999]">
          Mostrando <span className="font-semibold text-[#1A1A1A]">{validProducts.length}</span> de{' '}
          <span className="font-semibold text-[#1A1A1A]">{validProducts.length}</span> productos
        </p>
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

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// Versión mejorada con CSS Grid dinámico
export const ProductGridAdvanced = ({
  products = [],
  onAddToCart,
  loading = false,
  error = null,
  minColumns = 1,
  maxColumns = 4,
  showAnimation = true,
  itemsPerPage = null,
  onLoadMore = null,
}) => {
  const validProducts = useMemo(() => {
    return Array.isArray(products) ? products : [];
  }, [products]);

  const displayProducts = useMemo(() => {
    if (!itemsPerPage) return validProducts;
    return validProducts.slice(0, itemsPerPage);
  }, [validProducts, itemsPerPage]);

  const remainingProducts = useMemo(() => {
    if (!itemsPerPage) return 0;
    return validProducts.length - displayProducts.length;
  }, [validProducts, displayProducts, itemsPerPage]);

  // Estado de carga
  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-16">
        <Loader />
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="w-full py-16">
        <EmptyState
          title="Error al cargar productos"
          description={error || 'Ocurrió un error al cargar los productos. Por favor, intenta de nuevo.'}
          icon="⚠️"
        />
      </div>
    );
  }

  // Estado vacío
  if (validProducts.length === 0) {
    return (
      <div className="w-full py-16">
        <EmptyState
          title="No hay productos"
          description="No encontramos productos que coincidan con tu búsqueda. Intenta con otros filtros."
          icon="🔍"
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Grid de productos con CSS Grid dinámico */}
      <div
        className="grid w-full gap-6 auto-rows-max"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, calc((100% - (${displayProducts.length - 1} * 1.5rem)) / ${Math.min(Math.max(1, displayProducts.length), maxColumns)})), 1fr))`,
        }}
      >
        {displayProducts.map((product, index) => (
          <div
            key={product.id || index}
            className={`animate-fade-in ${showAnimation ? `opacity-0` : `opacity-100`}`}
            style={
              showAnimation
                ? {
                    animation: `fadeIn 0.6s ease-out forwards`,
                    animationDelay: `${index * 0.1}s`,
                  }
                : {}
            }
          >
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
            />
          </div>
        ))}
      </div>

      {/* Botón de ver más */}
      {remainingProducts > 0 && onLoadMore && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={onLoadMore}
            className="px-8 py-4 border-2 border-[#C6A75E] text-[#C6A75E] hover:bg-[#C6A75E] hover:text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Ver {remainingProducts} productos más
          </button>
        </div>
      )}

      {/* Contador de productos */}
      <div className="mt-12 text-center">
        <p className="text-sm text-[#999999]">
          Mostrando <span className="font-semibold text-[#1A1A1A]">{displayProducts.length}</span> de{' '}
          <span className="font-semibold text-[#1A1A1A]">{validProducts.length}</span> productos
        </p>
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

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        /* Grid responsivo dinámico */
        @media (max-width: 640px) {
          [style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          [style*="grid-template-columns"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (min-width: 1025px) and (max-width: 1280px) {
          [style*="grid-template-columns"] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (min-width: 1281px) {
          [style*="grid-template-columns"] {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductGrid;
