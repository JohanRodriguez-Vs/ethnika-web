import { useState, useCallback, useMemo } from 'react';

const DEFAULT_FILTERS = {
  categories: [],
  minPrice: '',
  maxPrice: '',
  inStock: undefined,
};

export function useFilters(products = []) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  const setFilter = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSortBy('default');
    setSearchQuery('');
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          (p.nombre || p.name || '').toLowerCase().includes(query) ||
          (p.categoria || '').toLowerCase().includes(query) ||
          (p.descripcion || '').toLowerCase().includes(query) ||
          (p.tags || []).some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter(
        (p) =>
          filters.categories.includes(p.categoria) ||
          filters.categories.includes(p.categoryId) ||
          filters.categories.includes(p.categoria?.toLowerCase().replace(/\s+/g, '-'))
      );
    }

    if (filters.minPrice !== '') {
      const min = Number(filters.minPrice);
      if (!isNaN(min)) {
        result = result.filter((p) => (p.precio || p.price) >= min);
      }
    }

    if (filters.maxPrice !== '') {
      const max = Number(filters.maxPrice);
      if (!isNaN(max)) {
        result = result.filter((p) => (p.precio || p.price) <= max);
      }
    }

    if (filters.inStock) {
      result = result.filter((p) => (p.stock || 0) > 0);
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.precio || a.price || 0) - (b.precio || b.price || 0));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.precio || b.price || 0) - (a.precio || a.price || 0));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      default:
        break;
    }

    return result;
  }, [products, searchQuery, filters, sortBy]);

  return {
    filters,
    setFilter,
    clearFilters,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    filteredProducts,
  };
}
