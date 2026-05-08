import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, LogOut } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import { useUI } from '../../hooks/useUI';
import { useAuth } from '../../hooks/useAuth';
import CartDrawer from '../cart/CartDrawer';

const NAV_LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/tienda', label: 'Tienda' },
  { to: '/artesanos', label: 'Artesanos' },
  { to: '/sobre-nosotros', label: 'Sobre Nosotros' },
];

function navLinkClass({ isActive }) {
  const base =
    'relative px-1 py-2 text-sm font-medium tracking-wide transition-colors duration-300';
  return isActive
    ? `${base} text-accent-gold`
    : `${base} text-primary-900 hover:text-accent-gold`;
}

function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems, items, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  const { favorites } = useFavorites();
  const { isCartOpen, openCart, closeCart } = useUI();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-navbar border-b border-primary-200/80 bg-primary-100/90 backdrop-blur-md">
        <nav
          className="container-ethnika flex h-20 items-center justify-between gap-4"
          aria-label="Navegacion principal"
        >
          <Link to="/" className="group inline-flex items-center gap-2">
            <span className="font-display text-xl font-bold leading-none text-primary-900 transition-colors duration-300 group-hover:text-accent-gold">
              ETHNIKA
            </span>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 sm:inline">
              BY COL
            </span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={navLinkClass}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => window.location.href = '/favoritos'}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary-300 text-primary-900 transition-colors duration-300 hover:border-accent-gold hover:text-accent-gold"
              aria-label="Ir a favoritos"
            >
              <Heart size={20} />
              {isAuthenticated && favorites.length > 0 && (
                <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-gold px-1 text-xs font-bold text-primary-900">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary-300 text-primary-900 transition-colors duration-300 hover:border-accent-gold hover:text-accent-gold"
              aria-label="Abrir carrito"
            >
              <ShoppingBag size={20} />
              {isAuthenticated && totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-gold px-1 text-xs font-bold text-primary-900">
                  {totalItems}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <div className="relative user-menu-container">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-primary-300 rounded-xl hover:border-accent-gold transition-colors duration-300"
                >
                  <User size={18} />
                  <span className="font-medium">{user?.nombre}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-primary-200 rounded-lg shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-primary-200">
                      <p className="text-sm font-medium text-primary-900">{user?.nombre}</p>
                      <p className="text-xs text-primary-600">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/perfil"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full px-4 py-2 text-sm text-left text-primary-900 hover:bg-primary-100 flex items-center gap-2"
                      >
                        <User size={16} />
                        Mi perfil
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-left text-primary-900 hover:bg-primary-100 flex items-center gap-2"
                      >
                        <LogOut size={16} />
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-secondary px-5 py-2 text-sm">
                Ingresar
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => window.location.href = '/favoritos'}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary-300 text-primary-900 transition-colors duration-300 hover:border-accent-gold hover:text-accent-gold"
              aria-label="Ir a favoritos"
            >
              <Heart size={20} />
              {isAuthenticated && favorites.length > 0 && (
                <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-gold px-1 text-xs font-bold text-primary-900">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary-300 text-primary-900 transition-colors duration-300 hover:border-accent-gold hover:text-accent-gold"
              aria-label="Abrir carrito"
            >
              <ShoppingBag size={20} />
              {isAuthenticated && totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-gold px-1 text-xs font-bold text-primary-900">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary-300 text-primary-900 transition-colors duration-300 hover:border-accent-gold hover:text-accent-gold"
              aria-label={isMobileOpen ? 'Cerrar menu' : 'Abrir menu'}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMobileOpen((prev) => !prev)}
            >
              <span className="sr-only">
                {isMobileOpen ? 'Cerrar menu de navegacion' : 'Abrir menu de navegacion'}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                {isMobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {isMobileOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-primary-200 bg-primary-100 lg:hidden"
          >
            <div className="container-ethnika py-4">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={`mobile-${link.to}`}>
                    <NavLink
                      to={link.to}
                      end={link.end}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                          isActive
                            ? 'bg-accent-gold/15 text-accent-gold'
                            : 'text-primary-900 hover:bg-primary-200/70'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="mt-4 grid grid-cols-1 gap-2">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 text-sm text-primary-900 border border-primary-200 rounded-lg">
                      <p className="font-medium">{user?.nombre}</p>
                      <p className="text-xs text-primary-600">{user?.email}</p>
                    </div>
                    <Link
                      to="/perfil"
                      onClick={() => setIsMobileOpen(false)}
                      className="btn-secondary justify-center px-4 py-2 text-sm"
                    >
                      Mi perfil
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsMobileOpen(false);
                      }}
                      className="btn-secondary justify-center px-4 py-2 text-sm"
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="btn-secondary justify-center px-4 py-2 text-sm">
                    Ingresar
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        items={items}
        onQuantityChange={(id, qty) => updateQuantity(id, qty)}
        onRemove={removeItem}
        onContinueShopping={() => {
          closeCart();
          window.location.href = '/tienda';
        }}
      />
    </>
  );
}

export default Navbar;
