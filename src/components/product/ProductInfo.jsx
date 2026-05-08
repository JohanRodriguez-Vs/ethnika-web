import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Check, AlertCircle, Share2 } from 'lucide-react';
import Button from '../ui/Button';

/**
 * ProductInfo Component
 * 
 * Información completa y elegante del producto
 * Incluye:
 * - Nombre y precio dinámico
 * - Descripción breve y historia cultural
 * - Selector de variantes
 * - Información del artesano
 * - Disponibilidad y stock
 * - Acciones (carrito, favoritos, compartir)
 * - Validación de selecciones
 * - Microinteracciones premium
 */

const ProductInfo = ({
  product = {},
  artisan = null,
  onAddToCart = null,
  onAddToFavorites = null,
  isFavorite = false,
  isInCart = false,
}) => {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(isInCart);
  const [validationError, setValidationError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Desestructuración del producto
  const {
    id = 'prod-001',
    name = 'Producto Artesanal',
    price = 150000,
    originalPrice = null,
    description = 'Descripción del producto',
    culturalStory = 'Historia cultural relacionada',
    variants = [],
    availability = true,
    stock = 10,
    tags = [],
    category = 'Sin categoría',
    artisanId = null,
  } = product;

  // Calcular descuento si existe precio original
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const hasDiscount = discount > 0;

  // Inicializar variantes seleccionadas
  useEffect(() => {
    const initialVariants = {};
    variants.forEach(variantGroup => {
      if (variantGroup.options && variantGroup.options.length > 0) {
        initialVariants[variantGroup.name] = variantGroup.options[0].value;
      }
    });
    setSelectedVariants(initialVariants);
  }, [variants]);

  // Validar selección de variantes
  const validateVariants = () => {
    const requiredVariants = variants.filter(v => v.required);
    for (let variant of requiredVariants) {
      if (!selectedVariants[variant.name]) {
        setValidationError(`Por favor selecciona ${variant.name}`);
        return false;
      }
    }
    setValidationError('');
    return true;
  };

  // Manejar cambio de variante
  const handleVariantChange = (variantName, value) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantName]: value
    }));
    setValidationError('');
  };

  // Manejar cantidad
  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(Math.min(value, stock));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(stock, prev + 1));
  };

  // Agregar al carrito
  const handleAddToCart = () => {
    if (!validateVariants()) {
      return;
    }

    const cartItem = {
      id,
      name,
      price,
      quantity,
      variants: selectedVariants,
      image: product.image || '/images/placeholder-product.jpg',
      artisanId,
    };

    if (onAddToCart) {
      onAddToCart(cartItem);
      setIsAdded(true);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
    }
  };

  // Toggle favoritos
  const handleToggleFavorite = () => {
    if (onAddToFavorites) {
      onAddToFavorites(id);
    }
  };

  // Compartir producto
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: description,
        url: window.location.href,
      }).catch(() => {});
    }
  };

  return (
    <div className="w-full">
      {/* ENCABEZADO - NOMBRE Y CATEGORÍA */}
      <div className="mb-4 lg:mb-6 pb-4 lg:pb-6 border-b border-stone-200">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">
              {category}
            </div>
            <h1 className="text-3xl lg:text-4xl font-serif text-stone-900 leading-tight mb-3">
              {name}
            </h1>
          </div>

          {/* BOTONES DE ACCIONES RÁPIDAS */}
          <div className="flex gap-2 flex-shrink-0">
            {/* FAVORITOS */}
            <button
              onClick={handleToggleFavorite}
              className={`p-2.5 rounded-lg transition-all duration-300 ${
                isFavorite
                  ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
              aria-label={isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
              title="Agregar a favoritos"
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>

            {/* COMPARTIR */}
            <button
              onClick={handleShare}
              className="p-2.5 rounded-lg bg-stone-100 text-stone-600 hover:bg-stone-200 transition-all duration-300"
              aria-label="Compartir producto"
              title="Compartir"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* TAGS */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium bg-amber-50 text-amber-800 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* PRECIO Y DISPONIBILIDAD */}
      <div className="mb-6 lg:mb-8 pb-6 lg:pb-8 border-b border-stone-200">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-4xl lg:text-5xl font-serif font-bold text-stone-900">
            ${price.toLocaleString('es-CO')}
          </span>

          {hasDiscount && (
            <>
              <span className="text-lg text-stone-500 line-through">
                ${originalPrice.toLocaleString('es-CO')}
              </span>
              <span className="ml-auto px-3 py-1 bg-amber-50 text-amber-800 font-bold text-sm rounded">
                -{discount}%
              </span>
            </>
          )}
        </div>

        {/* DISPONIBILIDAD */}
        <div className="flex items-center gap-2">
          {availability && stock > 0 ? (
            <>
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-emerald-700">
                {stock} en stock disponibles
              </span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-stone-400" />
              <span className="text-sm font-medium text-stone-600">
                Producto agotado
              </span>
            </>
          )}
        </div>
      </div>

      {/* DESCRIPCIÓN BREVE */}
      <div className="mb-6 lg:mb-8">
        <p className="text-base lg:text-lg leading-relaxed text-stone-700 font-light">
          {description}
        </p>
      </div>

      {/* HISTORIA CULTURAL */}
      {culturalStory && (
        <div className="mb-6 lg:mb-8 p-4 lg:p-6 bg-gradient-to-br from-amber-50 to-stone-50 border border-amber-100 rounded-lg">
          <h3 className="text-sm font-serif font-semibold text-stone-900 mb-2 uppercase tracking-wide">
            Historia & Cultura
          </h3>
          <p className="text-sm lg:text-base leading-relaxed text-stone-700 italic">
            {culturalStory}
          </p>
        </div>
      )}

      {/* VARIANTES */}
      {variants && variants.length > 0 && (
        <div className="mb-6 lg:mb-8 space-y-4">
          {variants.map((variantGroup) => (
            <div key={variantGroup.name} className="space-y-2">
              <label className="block text-sm font-medium text-stone-900">
                {variantGroup.name}
                {variantGroup.required && <span className="text-rose-500 ml-1">*</span>}
              </label>

              {variantGroup.type === 'select' ? (
                // DROPDOWN PARA VARIANTES
                <select
                  value={selectedVariants[variantGroup.name] || ''}
                  onChange={(e) => handleVariantChange(variantGroup.name, e.target.value)}
                  className="w-full px-4 py-2.5 border border-stone-300 rounded-lg bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                >
                  <option value="">Selecciona {variantGroup.name}</option>
                  {variantGroup.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label || option.value}
                    </option>
                  ))}
                </select>
              ) : (
                // BOTONES PARA VARIANTES
                <div className="flex flex-wrap gap-2">
                  {variantGroup.options?.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleVariantChange(variantGroup.name, option.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border-2 ${
                        selectedVariants[variantGroup.name] === option.value
                          ? 'border-amber-500 bg-amber-50 text-amber-900'
                          : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      {option.label || option.value}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CANTIDAD */}
      <div className="mb-6 lg:mb-8">
        <label className="block text-sm font-medium text-stone-900 mb-2">
          Cantidad
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="p-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Disminuir cantidad"
          >
            −
          </button>

          <input
            type="number"
            min="1"
            max={stock}
            value={quantity}
            onChange={handleQuantityChange}
            className="w-16 px-3 py-2 border border-stone-300 rounded-lg text-center text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Cantidad a comprar"
          />

          <button
            onClick={incrementQuantity}
            disabled={quantity >= stock}
            className="p-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Aumentar cantidad"
          >
            +
          </button>

          <span className="ml-auto text-sm text-stone-600">
            Máximo: {stock}
          </span>
        </div>
      </div>

      {/* ERRORES DE VALIDACIÓN */}
      {validationError && (
        <div className="mb-6 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2">
          <AlertCircle size={18} className="text-rose-600 flex-shrink-0 mt-0.5" />
          <span className="text-sm text-rose-800">{validationError}</span>
        </div>
      )}

      {/* MENSAJE DE ÉXITO */}
      {showSuccessMessage && (
        <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 animate-fade-in">
          <Check size={18} className="text-emerald-600" />
          <span className="text-sm font-medium text-emerald-800">
            Producto añadido al carrito
          </span>
        </div>
      )}

      {/* BOTONES DE ACCIÓN PRINCIPALES */}
      <div className="space-y-3 mb-6 lg:mb-8">
        {/* AGREGAR AL CARRITO */}
        <Button
          onClick={handleAddToCart}
          disabled={!availability || stock === 0}
          variant={isAdded ? 'secondary' : 'primary'}
          size="lg"
          className="w-full flex items-center justify-center gap-2"
          title={!availability ? 'Producto no disponible' : ''}
        >
          <ShoppingCart size={20} />
          <span>{isAdded ? 'Añadido al carrito' : 'Añadir al carrito'}</span>
        </Button>

        {/* COMPRAR AHORA (ALTERNATIVA) */}
        <button
          onClick={handleAddToCart}
          disabled={!availability || stock === 0}
          className="w-full px-6 py-3.5 rounded-lg border-2 border-stone-900 text-stone-900 font-semibold hover:bg-stone-900 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Comprar ahora
        </button>
      </div>

      {/* INFORMACIÓN DEL ARTESANO */}
      {artisan && (
        <div className="p-4 lg:p-6 bg-gradient-to-br from-stone-50 to-stone-100 rounded-lg border border-stone-200">
          <h3 className="text-sm font-serif font-semibold text-stone-900 mb-3 uppercase tracking-wide">
            Creado por
          </h3>

          <div className="flex items-start gap-3">
            {artisan.image && (
              <img
                src={artisan.image}
                alt={artisan.name}
                loading="lazy"
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
            )}

            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-stone-900 truncate">
                {artisan.name}
              </h4>
              {artisan.location && (
                <p className="text-xs text-stone-600">
                  📍 {artisan.location}
                </p>
              )}
              {artisan.description && (
                <p className="text-xs text-stone-700 mt-1 line-clamp-2">
                  {artisan.description}
                </p>
              )}
            </div>

            {/* ENLACE AL PERFIL DEL ARTESANO */}
            {artisan.id && (
              <a
                href={`/artesano/${artisan.id}`}
                className="ml-auto flex-shrink-0 text-amber-600 hover:text-amber-700 text-sm font-medium whitespace-nowrap"
              >
                Ver más →
              </a>
            )}
          </div>
        </div>
      )}

      {/* DETALLES ADICIONALES */}
      <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-xs font-medium text-stone-600 uppercase mb-1">
            Entrega
          </div>
          <p className="text-sm text-stone-900 font-medium">
            3-5 días
          </p>
        </div>

        <div className="text-center">
          <div className="text-xs font-medium text-stone-600 uppercase mb-1">
            Devoluciones
          </div>
          <p className="text-sm text-stone-900 font-medium">
            30 días
          </p>
        </div>

        <div className="text-center col-span-2 lg:col-span-1">
          <div className="text-xs font-medium text-stone-600 uppercase mb-1">
            Soporte
          </div>
          <p className="text-sm text-stone-900 font-medium">
            WhatsApp
          </p>
        </div>
      </div>

      {/* ESTILOS PERSONALIZADOS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type='number'] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default ProductInfo;
