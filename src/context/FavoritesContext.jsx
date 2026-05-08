import { createContext, useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import { useAuth } from '../hooks/useAuth';

export const FavoritesContext = createContext(null);

const STORAGE_KEY = 'ethnika_favorites';
const PERSISTENT_FAVORITES_KEY = 'ethnika_favorites_persistent';

function getValidProductIds(ids) {
  if (!Array.isArray(ids)) return [];
  return ids.filter((id) => productService.getById(id));
}

function getInitialFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return getValidProductIds(parsed);
  } catch {
    return [];
  }
}

function getPersistentFavorites() {
  try {
    const stored = localStorage.getItem(PERSISTENT_FAVORITES_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return getValidProductIds(parsed);
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      // Si hay sesión, cargar favoritos persistentes primero
      const persistentFavorites = getPersistentFavorites();
      const sessionFavorites = getInitialFavorites();
      
      // Si hay favoritos persistentes, usarlos, si no, usar los de sesión
      const favoritesToLoad = persistentFavorites.length > 0 ? persistentFavorites : sessionFavorites;
      setFavorites(favoritesToLoad);
      
      // Actualizar los favoritos de sesión con los persistentes
      if (persistentFavorites.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(persistentFavorites));
      }
    } else {
      // Si no hay sesión, limpiar solo los favoritos de sesión, mantener los persistentes
      setFavorites([]);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Siempre guardar en los favoritos persistentes cuando hay sesión activa
    if (isAuthenticated && favorites.length > 0) {
      localStorage.setItem(PERSISTENT_FAVORITES_KEY, JSON.stringify(favorites));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
    // Si no hay sesión, no limpiar los favoritos persistentes
  }, [favorites, isAuthenticated]);

  useEffect(() => {
    const valid = getValidProductIds(favorites);
    if (valid.length !== favorites.length) {
      setFavorites(valid);
    }
  }, []);

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const toggleFavorite = useCallback((productId) => {
    // Solo permitir agregar favoritos si hay sesión activa
    if (!isAuthenticated) {
      showNotification('Para agregar productos a favoritos debes iniciar sesión', 'warning');
      return; // No hacer nada si no hay sesión
    }

    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, [isAuthenticated, showNotification]);

  const isFavorite = useCallback(
    (productId) => favorites.includes(productId),
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
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
      <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
    </>
  );
}
