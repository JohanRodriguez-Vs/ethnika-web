export function filterByCategory(products, categories) {
  if (!categories || categories.length === 0) return products;
  return products.filter((p) =>
    categories.includes(p.categoria) ||
    categories.includes(p.categoryId) ||
    categories.includes((p.categoria || '').toLowerCase().replace(/\s+/g, '-'))
  );
}

export function filterByPriceRange(products, min, max) {
  let result = products;
  if (min !== '' && !isNaN(Number(min))) {
    result = result.filter((p) => (p.precio || p.price || 0) >= Number(min));
  }
  if (max !== '' && !isNaN(Number(max))) {
    result = result.filter((p) => (p.precio || p.price || 0) <= Number(max));
  }
  return result;
}

export function filterByAvailability(products, inStockOnly) {
  if (!inStockOnly) return products;
  return products.filter((p) => (p.stock || 0) > 0);
}

export function searchProducts(products, query) {
  if (!query || !query.trim()) return products;
  const q = query.toLowerCase().trim();
  return products.filter((p) => {
    const nombre = (p.nombre || p.name || '').toLowerCase();
    const categoria = (p.categoria || '').toLowerCase();
    const descripcion = (p.descripcion || '').toLowerCase();
    const tags = (p.tags || []).map((t) => t.toLowerCase());
    return (
      nombre.includes(q) ||
      categoria.includes(q) ||
      descripcion.includes(q) ||
      tags.some((t) => t.includes(q))
    );
  });
}

export function sortProducts(products, sortBy) {
  const sorted = [...products];
  switch (sortBy) {
    case 'price-asc':
      sorted.sort((a, b) => (a.precio || a.price || 0) - (b.precio || b.price || 0));
      break;
    case 'price-desc':
      sorted.sort((a, b) => (b.precio || b.price || 0) - (a.precio || a.price || 0));
      break;
    case 'newest':
      sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      break;
    default:
      break;
  }
  return sorted;
}

export function filterProducts(products, { categories, minPrice, maxPrice, inStock, sortBy, searchQuery } = {}) {
  let result = products;
  result = filterByCategory(result, categories);
  result = filterByPriceRange(result, minPrice, maxPrice);
  result = filterByAvailability(result, inStock);
  result = searchProducts(result, searchQuery);
  result = sortProducts(result, sortBy);
  return result;
}

export function getActiveFilterCount(filters = {}) {
  let count = 0;
  if (filters.categories?.length > 0) count++;
  if (filters.minPrice !== '' && filters.minPrice !== undefined) count++;
  if (filters.maxPrice !== '' && filters.maxPrice !== undefined) count++;
  if (filters.inStock) count++;
  return count;
}
