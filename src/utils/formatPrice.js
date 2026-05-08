export function formatPrice(price, options = {}) {
  const {
    currency = 'COP',
    locale = 'es-CO',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    compact = false,
  } = options;

  if (price == null || isNaN(price)) return '';

  const numericPrice = Number(price);

  if (compact) {
    if (numericPrice >= 1000000) {
      return `$${(numericPrice / 1000000).toFixed(1)}M`;
    }
    if (numericPrice >= 1000) {
      return `$${(numericPrice / 1000).toFixed(0)}K`;
    }
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(numericPrice);
  } catch {
    return `$${numericPrice.toLocaleString(locale)}`;
  }
}

export function formatPriceSimple(price) {
  if (price == null || isNaN(price)) return '';
  return `$${Number(price).toLocaleString('es-CO')}`;
}
