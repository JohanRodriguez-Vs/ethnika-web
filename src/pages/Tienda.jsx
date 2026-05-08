import { useMemo, useState } from 'react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ScrollReveal from '../components/ui/ScrollReveal';
import ProductCard from '../components/product/ProductCard';
import { useCart } from '../hooks/useCart';
import { productService } from '../services/productService';

const ALL_PRODUCTS = productService.getAll();

const SORT_OPTIONS = [
  { value: 'featured', label: 'Destacados' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'name-asc', label: 'Nombre: A-Z' },
];

function Tienda() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [sortBy, setSortBy] = useState('featured');
  const [stockOnly, setStockOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const { addItem } = useCart();

  const categories = useMemo(() => {
    const cats = ['Todas', ...new Set(ALL_PRODUCTS.map((p) => p.categoria).filter(Boolean))];
    return cats;
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    let data = ALL_PRODUCTS.filter((product) => {
      const nombre = (product.nombre || '').toLowerCase();
      const categoria = (product.categoria || '').toLowerCase();
      const artesano = (product.artesano || '').toLowerCase();
      const desc = (product.descripcion || '').toLowerCase();

      const matchesCategory = category === 'Todas' || product.categoria === category;
      const matchesStock = !stockOnly || (product.stock || 0) > 0;
      const matchesFeatured = !featuredOnly || (product.destacado === true);
      const matchesSearch =
        !normalizedSearch ||
        nombre.includes(normalizedSearch) ||
        artesano.includes(normalizedSearch) ||
        categoria.includes(normalizedSearch) ||
        desc.includes(normalizedSearch);

      return matchesCategory && matchesStock && matchesFeatured && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      data = [...data].sort((a, b) => (a.precio || a.price || 0) - (b.precio || b.price || 0));
    } else if (sortBy === 'price-desc') {
      data = [...data].sort((a, b) => (b.precio || b.price || 0) - (a.precio || a.price || 0));
    } else if (sortBy === 'name-asc') {
      data = [...data].sort((a, b) => (a.nombre || a.name || '').localeCompare(b.nombre || b.name || ''));
    }

    return data;
  }, [search, category, sortBy, stockOnly, featuredOnly]);

  return (
    <div className="ethnika-page">
      <section className="section-ethnika border-b border-primary-200">
        <div className="container-ethnika space-y-8">
          <ScrollReveal direction="up" className="text-center">
            <h1 className="heading-section md:text-5xl">Tienda Artesanal</h1>
            <p className="mx-auto mt-3 max-w-2xl text-lead">
              Explora piezas autenticas creadas por artesanos colombianos.
              Filtra, compara y conecta con productos de identidad cultural.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" className="card-ethnika p-4 md:p-5">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-800">
                  Buscar
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Producto, categoria o artesano"
                  className="input-ethnika"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-800">
                  Categoria
                </span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-ethnika"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-800">
                  Ordenar por
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-ethnika"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="space-y-2">
                <label className="flex items-end gap-2 rounded-xl border border-primary-300 bg-white px-4 py-3">
                  <input
                    type="checkbox"
                    checked={stockOnly}
                    onChange={(e) => setStockOnly(e.target.checked)}
                    className="h-4 w-4 accent-[#C6A75E]"
                  />
                  <span className="text-sm font-medium text-primary-900">
                    Solo disponibles
                  </span>
                </label>
                
                <label className="flex items-end gap-2 rounded-xl border border-primary-300 bg-white px-4 py-3">
                  <input
                    type="checkbox"
                    checked={featuredOnly}
                    onChange={(e) => setFeaturedOnly(e.target.checked)}
                    className="h-4 w-4 accent-[#C6A75E]"
                  />
                  <span className="text-sm font-medium text-primary-900">
                    Solo destacados
                  </span>
                </label>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-ethnika">
        <div className="container-ethnika">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              {filteredProducts.length} producto
              {filteredProducts.length === 1 ? '' : 's'} encontrado
              {filteredProducts.length === 1 ? '' : 's'}
            </p>
            <Badge variant="gold" tone="soft">
              Catalogo ETHNIKA
            </Badge>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="card-ethnika p-8 text-center">
              <h2 className="font-display text-2xl font-semibold text-primary-900">
                No encontramos resultados
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-gray-700">
                Ajusta los filtros o usa otra palabra clave para descubrir mas
                artesanias.
              </p>
              <div className="mt-4">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearch('');
                    setCategory('Todas');
                    setSortBy('featured');
                    setStockOnly(false);
                    setFeaturedOnly(false);
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <ScrollReveal
                  key={product.id}
                  direction="up"
                  delay={index * 70}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={(prod) => addItem(prod, {}, 1)}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Tienda;
