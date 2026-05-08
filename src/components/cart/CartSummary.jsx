import React, { useState } from 'react';
import { ShoppingCart, ArrowRight, AlertCircle, Check } from 'lucide-react';
import Button from '../ui/Button';

/**
 * CartSummary Component
 * 
 * Resumen elegante y funcional del carrito de compras
 * Incluye:
 * - Cálculo automático de totales (subtotal, impuestos, envío, total)
 * - Información de costos desglosada
 * - Botones de acción (continuar comprando, finalizar pedido)
 * - Validación de carrito vacío
 * - Integración con WhatsApp
 * - Diseño premium minimalista
 * - Responsive mobile-first
 */

const CartSummary = ({
  items = [],
  subtotal = 0,
  shippingCost = 0,
  taxRate = 0.08, // 8% de impuesto
  onContinueShopping = null,
  onCheckout = null,
  isProcessing = false,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  // Calcular valores
  const calculatedSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const finalSubtotal = subtotal || calculatedSubtotal;
  const taxes = Math.round(finalSubtotal * taxRate);
  const total = finalSubtotal + taxes + shippingCost;

  // Verificar si hay items
  const isEmpty = items.length === 0;

  // Manejar checkout
  const handleCheckout = () => {
    if (!isEmpty && onCheckout) {
      onCheckout({
        subtotal: finalSubtotal,
        taxes,
        shipping: shippingCost,
        total,
        itemCount: items.length,
      });
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* ENCABEZADO */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200">
        <h2 className="text-lg lg:text-xl font-serif font-semibold text-stone-900 flex items-center gap-2">
          <ShoppingCart size={20} />
          Resumen del Pedido
        </h2>
        <span className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm font-medium">
          {items.length} {items.length === 1 ? 'producto' : 'productos'}
        </span>
      </div>

      {/* CARRITO VACÍO */}
      {isEmpty ? (
        <div className="p-8 bg-gradient-to-br from-stone-50 to-stone-100 rounded-lg border border-stone-200 text-center">
          <ShoppingCart size={32} className="mx-auto text-stone-400 mb-3" />
          <p className="text-stone-700 font-medium mb-3">Tu carrito está vacío</p>
          <p className="text-sm text-stone-600 mb-4">Explora nuestra tienda para agregar productos</p>
          <button
            onClick={onContinueShopping}
            className="inline-flex items-center gap-2 px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-all font-medium"
          >
            <span>Continuar comprando</span>
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <>
          {/* DESGLOSE DE COSTOS */}
          <div className="space-y-3 p-4 lg:p-6 bg-gradient-to-br from-stone-50 to-stone-100 rounded-lg border border-stone-200">
            {/* SUBTOTAL */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-600">Subtotal</span>
              <span className="font-medium text-stone-900">
                ${finalSubtotal.toLocaleString('es-CO')}
              </span>
            </div>

            {/* ENVÍO */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-600 flex items-center gap-1">
                Envío
                {shippingCost === 0 && (
                  <span className="text-emerald-600 font-semibold text-xs">¡Gratis!</span>
                )}
              </span>
              <span className="font-medium text-stone-900">
                {shippingCost === 0 ? 'Incluido' : `$${shippingCost.toLocaleString('es-CO')}`}
              </span>
            </div>

            {/* IMPUESTOS */}
            <div className="flex items-center justify-between text-sm pt-3 border-t border-stone-200">
              <span className="text-stone-600">Impuesto ({Math.round(taxRate * 100)}%)</span>
              <span className="font-medium text-stone-900">
                ${taxes.toLocaleString('es-CO')}
              </span>
            </div>

            {/* TOTAL - DESTACADO */}
            <div className="flex items-baseline justify-between pt-3 border-t-2 border-amber-200 mt-3">
              <span className="text-base lg:text-lg font-serif font-semibold text-stone-900">
                Total
              </span>
              <span className="font-serif text-2xl lg:text-3xl font-bold text-amber-700">
                ${total.toLocaleString('es-CO')}
              </span>
            </div>

            {/* BOTÓN VER DETALLES */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full text-xs text-center text-stone-600 hover:text-stone-900 font-medium py-2 transition-colors"
            >
              {showDetails ? '↑ Ocultar detalles' : '↓ Ver más detalles'}
            </button>

            {/* DETALLES EXPANDIBLES */}
            {showDetails && (
              <div className="mt-4 pt-4 border-t border-stone-300 space-y-2 text-xs text-stone-600">
                <div className="flex items-center justify-between">
                  <span>Items en carrito:</span>
                  <span className="font-medium text-stone-900">{items.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Método de pago:</span>
                  <span className="font-medium text-stone-900">WhatsApp</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tiempo estimado:</span>
                  <span className="font-medium text-stone-900">3-5 días</span>
                </div>
              </div>
            )}
          </div>

          {/* INFORMACIÓN DE CONFIANZA */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {/* SEGURIDAD */}
            <div className="p-3 bg-white border border-stone-200 rounded-lg text-center">
              <div className="text-xs font-medium text-stone-600 mb-1">Seguridad</div>
              <div className="text-xs text-stone-700 font-semibold">SSL Encriptado</div>
            </div>

            {/* GARANTÍA */}
            <div className="p-3 bg-white border border-stone-200 rounded-lg text-center">
              <div className="text-xs font-medium text-stone-600 mb-1">Garantía</div>
              <div className="text-xs text-stone-700 font-semibold">30 Días</div>
            </div>

            {/* DEVOLUCIÓN */}
            <div className="p-3 bg-white border border-stone-200 rounded-lg text-center col-span-2 lg:col-span-1">
              <div className="text-xs font-medium text-stone-600 mb-1">Devoluciones</div>
              <div className="text-xs text-stone-700 font-semibold">Sin costo</div>
            </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="space-y-3 pt-4">
            {/* BOTÓN PRINCIPAL - FINALIZAR PEDIDO */}
            <Button
              onClick={handleCheckout}
              disabled={isEmpty || isProcessing}
              variant="primary"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
              loading={isProcessing}
            >
              <ShoppingCart size={20} />
              <span>Finalizar Pedido por WhatsApp</span>
              <ArrowRight size={18} />
            </Button>

            {/* BOTÓN SECUNDARIO - CONTINUAR COMPRANDO */}
            <button
              onClick={onContinueShopping}
              className="w-full px-6 py-3 rounded-lg border-2 border-stone-900 text-stone-900 font-semibold hover:bg-stone-900 hover:text-white transition-all duration-300 active:scale-95"
            >
              Continuar Comprando
            </button>
          </div>

          {/* BENEFICIOS */}
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg space-y-2">
            <div className="flex items-start gap-3">
              <Check size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-900">Compra 100% segura</p>
                <p className="text-xs text-amber-800">Tus datos están protegidos</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-900">Apoyo a artesanos</p>
                <p className="text-xs text-amber-800">Tu compra apoya directamente a creadores colombianos</p>
              </div>
            </div>
          </div>

          {/* TÉRMINOS Y CONDICIONES */}
          <p className="text-xs text-stone-600 text-center">
            Al continuar, aceptas nuestros{' '}
            <a href="/terminos" className="font-semibold text-stone-900 hover:text-amber-600 transition-colors">
              términos y condiciones
            </a>
            {' '}y{' '}
            <a href="/privacidad" className="font-semibold text-stone-900 hover:text-amber-600 transition-colors">
              política de privacidad
            </a>
          </p>

          {/* MENSAJE DE VALIDACIÓN */}
          {isProcessing && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-400 border-t-blue-600 rounded-full animate-spin" />
              <span className="text-sm font-medium text-blue-900">
                Preparando tu pedido...
              </span>
            </div>
          )}
        </>
      )}

      {/* ESTILOS PERSONALIZADOS */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CartSummary;
