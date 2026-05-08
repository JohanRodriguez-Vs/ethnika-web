export const SITE_NAME = 'ETHNIKA BY COL';
export const SITE_TAGLINE = 'Esencia que conecta';

export const WHATSAPP_NUMBER = '573206279262';
export const WHATSAPP_MESSAGE_PREFIX = 'Hola, quiero realizar el siguiente pedido:';

export const DEFAULT_CURRENCY = 'COP';
export const DEFAULT_LOCALE = 'es-CO';

export const TAX_RATE = 0.08;
export const SHIPPING_COST = 0;

export const STORAGE_KEYS = {
  CART: 'ethnika_cart',
  FAVORITES: 'ethnika_favorites',
  USER: 'ethnika_user',
};

export const SORT_OPTIONS = [
  { value: 'default', label: 'Relevancia' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'newest', label: 'Más recientes' },
];

export const PRODUCTS_PER_PAGE = 12;

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
};

export const NAV_LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/tienda', label: 'Tienda' },
  { to: '/artesanos', label: 'Artesanos' },
  { to: '/sobre-nosotros', label: 'Sobre Nosotros' },
];

export const ADMIN_NAV_LINKS = [
  { to: '/admin-ethnika-panel', label: 'Dashboard', end: true },
  { to: '/admin-ethnika-panel/productos', label: 'Productos' },
  { to: '/admin-ethnika-panel/categorias', label: 'Categorías' },
  { to: '/admin-ethnika-panel/artesanos', label: 'Artesanos' },
  { to: '/admin-ethnika-panel/configuracion', label: 'Configuración' },
];
