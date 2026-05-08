import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';

export const CartContext = createContext(null);

const STORAGE_KEY = 'ethnika_cart';
const PERSISTENT_CART_KEY = 'ethnika_cart_persistent';

function getInitialCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function getPersistentCart() {
  try {
    const stored = localStorage.getItem(PERSISTENT_CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      // Si hay sesión, intentar recuperar el carrito persistente primero
      const persistentCart = getPersistentCart();
      const sessionCart = getInitialCart();
      
      // Si hay carrito persistente, usarlo, si no, usar el de sesión
      const cartToLoad = persistentCart.length > 0 ? persistentCart : sessionCart;
      setItems(cartToLoad);
      
      // Actualizar el carrito de sesión con el persistente
      if (persistentCart.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(persistentCart));
      }
    } else {
      // Si no hay sesión, limpiar solo el carrito de sesión, mantener el persistente
      setItems([]);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Siempre guardar en el carrito persistente cuando hay sesión activa
    if (isAuthenticated && items.length > 0) {
      localStorage.setItem(PERSISTENT_CART_KEY, JSON.stringify(items));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
    // Si no hay sesión, no limpiar el carrito persistente
  }, [items, isAuthenticated]);

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const addItem = useCallback((product, variant, quantity = 1) => {
    // Solo permitir agregar items si hay sesión activa
    if (!isAuthenticated) {
      showNotification('Para agregar productos al carrito debes iniciar sesión', 'warning');
      return; // No hacer nada si no hay sesión
    }

    setItems((prev) => {
      const key = `${product.id}-${JSON.stringify(variant)}`;
      const existing = prev.find(
        (item) => `${item.id}-${JSON.stringify(item.variants)}` === key
      );

      if (existing) {
        return prev.map((item) =>
          `${item.id}-${JSON.stringify(item.variants)}` === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.nombre || product.name,
          price: product.precio || product.price,
          image: product.imagen || product.image || '',
          variants: variant || {},
          quantity,
        },
      ];
    });
  }, [isAuthenticated, showNotification]);

  const removeItem = useCallback((itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
    notification,
  };

  return (
    <>
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg shadow-lg max-w-sm">
          <div className="flex items-center gap-2">
            <span className="text-yellow-600">⚠</span>
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        </div>
      )}
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    </>
  );
}
