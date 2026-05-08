import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, AlertCircle } from 'lucide-react';

/**
 * CartItem Component
 * 
 * Producto individual dentro del carrito de compras
 * Incluye:
 * - Imagen del producto con preview
 * - Información del producto y variantes seleccionadas
 * - Control de cantidad con validación
 * - Cálculo de subtotal dinámico
 * - Botón de eliminación elegante
 * - Diseño premium minimalista
 * - Responsive mobile-first
 */

const CartItem = ({
  item = {},
  onQuantityChange = null,
  onRemove = null,
  maxStock = 10,
}) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [isRemoving, setIsRemoving] = useState(false);

  // Desestructuración del item
  const {
    id = 'prod-001',
    name = 'Producto Artesanal',
    price = 100000,
    quantity: itemQuantity = 1,
    variants = {},
    image = '/images/placeholder-product.jpg',
  } = item;

  // Calcular subtotal
  const subtotal = price * quantity;

  // Actualizar cantidad localmente
  useEffect(() => {
    setQuantity(itemQuantity);
  }, [itemQuantity]);

  // Manejar cambio de cantidad
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      setQuantity(newQuantity);
      if (onQuantityChange) {
        onQuantityChange(id, newQuantity);
      }
    }
  };

  const decrementQuantity = () => {
    handleQuantityChange(quantity - 1);
  };

  const incrementQuantity = () => {
    handleQuantityChange(quantity + 1);
  };

  // Manejar eliminación
  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      if (onRemove) {
        onRemove(id);
      }
    }, 300);
  };

  return (
    <div
      className={`flex gap-4 lg:gap-6 p-4 lg:p-5 bg-white border border-stone-200 rounded-lg transition-all duration-300 ${
        isRemoving ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
      }`}
    >
      {/* IMAGEN DEL PRODUCTO */}
      <div className="flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 group relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* INFORMACIÓN DEL PRODUCTO */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        {/* NOMBRE Y VARIANTES */}
        <div className="mb-2">
          <h3 className="font-serif text-sm lg:text-base font-semibold text-stone-900 line-clamp-2 mb-1">
            {name}
          </h3>

          {/* VARIANTES SELECCIONADAS */}
          {Object.keys(variants).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {Object.entries(variants).map(([key, value]) => (
                <span
                  key={key}
                  className="text-xs font-medium text-stone-600 bg-stone-100 px-2 py-1 rounded"
                >
                  {key}: <span className="font-semibold text-stone-900">{value}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* PRECIO */}
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-stone-600">Precio:</span>
          <span className="font-serif text-base lg:text-lg font-bold text-stone-900">
            ${price.toLocaleString('es-CO')}
          </span>
        </div>
      </div>

      {/* CONTROLES - CANTIDAD Y PRECIO TOTAL */}
      <div className="flex flex-col items-end justify-between gap-3">
        {/* CANTIDAD */}
        <div className="flex items-center gap-2 bg-stone-50 rounded-lg p-1 border border-stone-200">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
            aria-label="Disminuir cantidad"
            title="Disminuir"
          >
            <Minus size={16} className="text-stone-700" />
          </button>

          <input
            type="number"
            min="1"
            max={maxStock}
            value={quantity}
            onChange={(e) => handleQuantityChange(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-10 text-center text-sm font-semibold text-stone-900 bg-transparent focus:outline-none"
            aria-label="Cantidad"
          />

          <button
            onClick={incrementQuantity}
            disabled={quantity >= maxStock}
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
            aria-label="Aumentar cantidad"
            title="Aumentar"
          >
            <Plus size={16} className="text-stone-700" />
          </button>
        </div>

        {/* SUBTOTAL Y BOTÓN ELIMINAR */}
        <div className="flex flex-col items-end gap-2">
          {/* SUBTOTAL */}
          <div className="text-right">
            <div className="text-xs font-medium text-stone-600 mb-0.5">Subtotal</div>
            <div className="font-serif text-lg lg:text-xl font-bold text-amber-700">
              ${subtotal.toLocaleString('es-CO')}
            </div>
          </div>

          {/* BOTÓN ELIMINAR */}
          <button
            onClick={handleRemove}
            className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all duration-200 active:scale-95"
            aria-label="Eliminar del carrito"
            title="Eliminar producto"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* ADVERTENCIA DE STOCK MÁXIMO */}
      {quantity >= maxStock && (
        <div className="absolute -bottom-8 left-0 right-0 flex items-center gap-1.5 text-amber-700 text-xs font-medium px-4">
          <AlertCircle size={14} />
          <span>Stock máximo alcanzado</span>
        </div>
      )}

      {/* ESTILOS PERSONALIZADOS */}
      <style jsx>{`
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

export default CartItem;
