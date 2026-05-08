import React, { useState, useEffect } from 'react';
import { ChevronDown, Check, AlertCircle } from 'lucide-react';

/**
 * ProductVariants Component
 * 
 * Selector elegante y funcional de variantes de producto
 * Incluye:
 * - Múltiples tipos de variantes (color, talla, forma, etc.)
 * - Visualización color-coded para variantes de color
 * - Dropdowns o botones según el tipo
 * - Validación de selección
 * - Feedback visual de disponibilidad
 * - Precio dinámico según variante
 * - Diseño responsive y minimalista premium
 */

const ProductVariants = ({
  variants = [],
  selectedVariants = {},
  onVariantChange = null,
  priceByVariant = null,
  availabilityByVariant = null,
  requiredVariants = [],
}) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [dynamicPrice, setDynamicPrice] = useState(null);
  const [dynamicAvailability, setDynamicAvailability] = useState(true);

  // Validar variantes requeridas
  const validateVariants = () => {
    const errors = {};
    requiredVariants.forEach(variantName => {
      if (!selectedVariants[variantName]) {
        errors[variantName] = `Selecciona ${variantName}`;
      }
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Actualizar precio y disponibilidad dinámicos
  useEffect(() => {
    if (priceByVariant || availabilityByVariant) {
      const variantKey = Object.values(selectedVariants).join('-');
      
      if (priceByVariant && priceByVariant[variantKey]) {
        setDynamicPrice(priceByVariant[variantKey]);
      }
      
      if (availabilityByVariant && availabilityByVariant[variantKey] !== undefined) {
        setDynamicAvailability(availabilityByVariant[variantKey]);
      }
    }
  }, [selectedVariants, priceByVariant, availabilityByVariant]);

  // Manejar cambio de variante
  const handleVariantChange = (variantName, value) => {
    if (onVariantChange) {
      onVariantChange(variantName, value);
    }
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[variantName];
      return newErrors;
    });
  };

  // Obtener color hex si es variante de color
  const getColorHex = (colorName) => {
    const colorMap = {
      'Rojo': '#DC2626',
      'Azul': '#2563EB',
      'Verde': '#16A34A',
      'Negro': '#1F2937',
      'Blanco': '#F3F4F6',
      'Crema': '#FFFBEB',
      'Dorado': '#D97706',
      'Café': '#92400E',
      'Beige': '#D2B48C',
      'Gris': '#9CA3AF',
      'Naranja': '#EA580C',
      'Morado': '#7C3AED',
    };
    return colorMap[colorName] || colorName;
  };

  // Verificar si una opción está disponible
  const isOptionAvailable = (variantName, optionValue) => {
    // Si no hay información de disponibilidad, asumir que está disponible
    if (!availabilityByVariant) return true;
    
    const variantKey = `${optionValue}`;
    return availabilityByVariant[variantKey] !== false;
  };

  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-6">
      {/* TÍTULO GENERAL */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-serif font-semibold text-stone-900">
          Personaliza tu producto
        </h3>
        {requiredVariants.length > 0 && (
          <span className="text-xs font-medium text-stone-600">
            Los campos con <span className="text-rose-500">*</span> son obligatorios
          </span>
        )}
      </div>

      {/* GRUPOS DE VARIANTES */}
      <div className="space-y-5">
        {variants.map((variantGroup) => {
          const isRequired = requiredVariants.includes(variantGroup.name);
          const hasError = validationErrors[variantGroup.name];
          const selectedValue = selectedVariants[variantGroup.name];

          return (
            <div
              key={variantGroup.name}
              className={`pb-5 border-b border-stone-200 last:border-b-0 last:pb-0 transition-all duration-300 ${
                hasError ? 'bg-rose-50 p-4 rounded-lg border border-rose-100' : ''
              }`}
            >
              {/* ENCABEZADO DE VARIANTE */}
              <div className="flex items-baseline justify-between mb-3">
                <label className="block text-sm font-semibold text-stone-900">
                  {variantGroup.name}
                  {isRequired && <span className="text-rose-500 ml-1">*</span>}
                </label>
                
                {selectedValue && (
                  <span className="text-xs font-medium text-stone-600 bg-stone-100 px-2.5 py-1 rounded">
                    {selectedValue}
                  </span>
                )}
              </div>

              {/* ERROR MESSAGE */}
              {hasError && (
                <div className="mb-3 flex items-center gap-2 text-rose-700 text-sm">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{hasError}</span>
                </div>
              )}

              {/* SELECTOR SEGÚN TIPO */}
              {variantGroup.type === 'select' || variantGroup.options.length > 6 ? (
                // DROPDOWN PARA VARIANTES CON MUCHAS OPCIONES
                <div className="relative group">
                  <select
                    value={selectedValue || ''}
                    onChange={(e) => handleVariantChange(variantGroup.name, e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg text-sm font-medium appearance-none cursor-pointer transition-all duration-300 pr-10 ${
                      selectedValue
                        ? 'bg-white border-2 border-amber-500 text-stone-900'
                        : 'bg-stone-50 border-2 border-stone-200 text-stone-700 hover:border-stone-300'
                    } focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-0`}
                  >
                    <option value="">Selecciona {variantGroup.name}</option>
                    {variantGroup.options?.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        disabled={!isOptionAvailable(variantGroup.name, option.value)}
                      >
                        {option.label || option.value}
                        {!isOptionAvailable(variantGroup.name, option.value) ? ' (Agotado)' : ''}
                      </option>
                    ))}
                  </select>

                  {/* ICONO DE DROPDOWN */}
                  <ChevronDown
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-600 pointer-events-none transition-transform group-hover:translate-y-0"
                  />
                </div>
              ) : (
                // BOTONES PARA VARIANTES CON POCAS OPCIONES
                <div className="flex flex-wrap gap-2.5">
                  {variantGroup.options?.map((option) => {
                    const isSelected = selectedValue === option.value;
                    const isAvailable = isOptionAvailable(variantGroup.name, option.value);
                    const isColorVariant = variantGroup.name.toLowerCase().includes('color');

                    return (
                      <button
                        key={option.value}
                        onClick={() => isAvailable && handleVariantChange(variantGroup.name, option.value)}
                        disabled={!isAvailable}
                        className={`relative group transition-all duration-300 ${
                          isSelected ? 'ring-2 ring-amber-500 ring-offset-2' : ''
                        } ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title={!isAvailable ? 'Opción no disponible' : option.label || option.value}
                      >
                        {/* BOTÓN VARIANTE */}
                        <div
                          className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                            isColorVariant
                              ? // VARIANTE COLOR - VISUAL CON CIRCULO
                                isSelected
                                ? 'bg-white border-2 border-amber-500'
                                : 'bg-stone-50 border-2 border-stone-300 hover:border-stone-400'
                              : // VARIANTE NORMAL - TEXTO
                              isSelected
                              ? 'bg-stone-900 text-white border-2 border-stone-900'
                              : 'bg-white text-stone-900 border-2 border-stone-300 hover:border-stone-400 hover:bg-stone-50'
                          }`}
                        >
                          {/* PREVIEW DE COLOR */}
                          {isColorVariant && (
                            <div
                              className="w-5 h-5 rounded-full border-2 border-stone-300 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                              style={{
                                backgroundColor: getColorHex(option.label || option.value),
                              }}
                              title={option.label || option.value}
                            />
                          )}

                          {/* LABEL */}
                          <span>{option.label || option.value}</span>

                          {/* CHECKMARK SI ESTÁ SELECCIONADO */}
                          {isSelected && (
                            <Check size={16} className="ml-auto flex-shrink-0 animate-scale-in" />
                          )}
                        </div>

                        {/* TOOLTIP AGOTADO */}
                        {!isAvailable && (
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            Agotado
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* DESCRIPCIÓN O NOTA */}
              {variantGroup.description && (
                <p className="text-xs text-stone-600 mt-2 italic">
                  💡 {variantGroup.description}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* INFORMACIÓN ADICIONAL - PRECIO Y DISPONIBILIDAD DINÁMICOS */}
      {(dynamicPrice !== null || !dynamicAvailability) && (
        <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-stone-50 border border-amber-100 rounded-lg space-y-2">
          {dynamicPrice !== null && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-700">Precio para esta selección:</span>
              <span className="text-lg font-serif font-bold text-amber-700">
                ${dynamicPrice.toLocaleString('es-CO')}
              </span>
            </div>
          )}

          {!dynamicAvailability && (
            <div className="flex items-center gap-2 text-rose-700 text-sm">
              <AlertCircle size={16} />
              <span className="font-medium">Esta combinación no está disponible</span>
            </div>
          )}

          {dynamicAvailability && (
            <div className="flex items-center gap-2 text-emerald-700 text-sm">
              <Check size={16} />
              <span className="font-medium">Disponible en esta variante</span>
            </div>
          )}
        </div>
      )}

      {/* RESUMEN DE SELECCIÓN */}
      {Object.keys(selectedVariants).length > 0 && (
        <div className="mt-4 p-3 bg-stone-50 rounded-lg border border-stone-200">
          <p className="text-xs font-medium text-stone-700 mb-2">Tu selección:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedVariants).map(([key, value]) => (
              <div
                key={key}
                className="px-3 py-1 bg-stone-200 text-stone-900 rounded-full text-xs font-medium"
              >
                {key}: <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ESTILOS PERSONALIZADOS */}
      <style jsx>{`
        select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%237c8899' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 0.75rem;
          padding-right: 2.5rem;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-scale-in {
          animation: scaleIn 0.2s ease-out;
        }

        /* Deshabilitar spinners de número en inputs */
        input[type='number']::-webkit-outer-spin-button,
        input[type='number']::-webkit-inner-spin-button {
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

export default ProductVariants;
