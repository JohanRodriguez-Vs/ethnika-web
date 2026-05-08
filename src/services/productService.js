import productos from '../data/productos.json';

export const productService = {
  getAll() {
    return Array.isArray(productos) ? [...productos] : [];
  },

  getById(id) {
    return productos.find((p) => p.id === id) || null;
  },

  getByCategory(categoryId) {
    return productos.filter(
      (p) =>
        p.categoryId === categoryId ||
        (p.categoria || '').toLowerCase().replace(/\s+/g, '-') === categoryId
    );
  },

  getByArtisan(artisanId) {
    return productos.filter((p) => p.artesanoId === artisanId);
  },

  getFeatured() {
    return productos.filter((p) => p.destacado);
  },

  getRelated(productId, limit = 4) {
    const product = this.getById(productId);
    if (!product) return [];

    return productos
      .filter(
        (p) =>
          p.id !== productId &&
          (p.categoryId === product.categoryId ||
            p.artesanoId === product.artesanoId)
      )
      .slice(0, limit);
  },

  getCategories() {
    const cats = [...new Set(productos.map((p) => p.categoria).filter(Boolean))];
    return cats.map((name) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      nombre: name,
    }));
  },

  search(query) {
    if (!query || !query.trim()) return this.getAll();
    const q = query.toLowerCase().trim();
    return productos.filter((p) => {
      const nombre = (p.nombre || '').toLowerCase();
      const desc = (p.descripcion || '').toLowerCase();
      const historia = (p.historia || '').toLowerCase();
      const tags = (p.tags || []).map((t) => t.toLowerCase());
      return (
        nombre.includes(q) ||
        desc.includes(q) ||
        historia.includes(q) ||
        tags.some((t) => t.includes(q))
      );
    });
  },

  getInStock() {
    return productos.filter((p) => (p.stock || 0) > 0);
  },
};
