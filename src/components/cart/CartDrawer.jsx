import { useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import CartItem from './CartItem';
import EmptyState from '../common/EmptyState';
import { formatPrice } from '../../utils/formatPrice';

function CartDrawer({
  isOpen = false,
  onClose,
  items = [],
  onQuantityChange,
  onRemove,
  onContinueShopping,
}) {
  const navigate = useNavigate();

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && onClose) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const isEmpty = items.length === 0;

  return createPortal(
    <div
      className="fixed inset-0 z-drawer flex justify-end"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-primary-900/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className="relative flex w-full max-w-md flex-col bg-primary-100 shadow-elegant-xl animate-slide-in-right"
      >
        <header className="flex items-center justify-between border-b border-primary-200 px-5 py-4">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-primary-900" />
            <h2 className="font-display text-lg font-semibold text-primary-900">
              Tu Carrito
            </h2>
            {!isEmpty && (
              <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-accent-gold px-2 text-xs font-bold text-primary-900">
                {items.length}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary-300 text-primary-900 transition-colors duration-300 hover:border-accent-gold hover:text-accent-gold"
            aria-label="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {isEmpty ? (
            <div className="flex h-full items-center justify-center">
              <EmptyState
                icon={<ShoppingBag size={48} />}
                title="Tu carrito está vacío"
                description="Explora nuestra tienda y agrega productos artesanales únicos."
                action={
                  <button
                    onClick={onContinueShopping}
                    className="btn-primary inline-flex items-center gap-2 px-6 py-3"
                  >
                    <span>Ir a la Tienda</span>
                    <ArrowRight size={18} />
                  </button>
                }
              />
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={`${item.id}-${JSON.stringify(item.variants)}`}
                  item={item}
                  onQuantityChange={onQuantityChange}
                  onRemove={onRemove}
                />
              ))}
            </div>
          )}
        </div>

        {!isEmpty && (
          <footer className="border-t border-primary-200 px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary-800">Subtotal</span>
              <span className="font-display text-xl font-bold text-primary-900">
                {formatPrice(subtotal)}
              </span>
            </div>

            <button
              onClick={() => {
                if (onClose) onClose();
                navigate('/carrito');
              }}
              className="w-full rounded-full bg-primary-900 px-6 py-3 text-sm font-semibold text-primary-100 shadow-elegant transition-all duration-300 hover:bg-accent-gold hover:text-primary-900 hover:shadow-gold"
            >
              Ir al carrito
            </button>

            <button
              onClick={onContinueShopping}
              className="w-full rounded-full border border-primary-900 bg-transparent px-6 py-3 text-sm font-semibold text-primary-900 transition-all duration-300 hover:border-accent-gold hover:bg-accent-gold/10"
            >
              Seguir comprando
            </button>
          </footer>
        )}
      </div>
    </div>,
    document.body
  );
}

export default CartDrawer;
