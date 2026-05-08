import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ScrollReveal from '../components/ui/ScrollReveal';
import { useFavorites } from '../hooks/useFavorites';
import { productService } from '../services/productService';

function formatPrice(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

function Favoritos() {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const [search, setSearch] = useState('');
  const [showOnlyStock, setShowOnlyStock] = useState(false);

  const favoriteProducts = useMemo(() => {
    return favorites
      .map((id) => productService.getById(id))
      .filter(Boolean);
  }, [favorites]);

  const filteredFavorites = useMemo(() => {
    const term = search.trim().toLowerCase();

    return favoriteProducts.filter((item) => {
      const name = (item.nombre || item.name || '').toLowerCase();
      const category = (item.categoria || '').toLowerCase();
      const artisan = (item.artesano || '').toLowerCase();
      const matchesSearch =
        !term ||
        name.includes(term) ||
        category.includes(term) ||
        artisan.includes(term);
      const matchesStock = !showOnlyStock || (item.stock || 0) > 0;

      return matchesSearch && matchesStock;
    });
  }, [favoriteProducts, search, showOnlyStock]);

  return (
    <div className="ethnika-page">
      <section className="section-ethnika">
        <div className="container-ethnika">
          <ScrollReveal direction="up" className="mb-8">
            <h1 className="heading-section md:text-5xl">Favoritos</h1>
            <p className="mt-3 max-w-2xl text-lead">
              Guarda productos de interes para compararlos luego y continuar tu
              proceso de compra cultural.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" className="card-ethnika mb-6 p-4 md:p-5">
            <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_auto]">
              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-800">
                  Buscar favorito
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Producto, categoria o artesano"
                  className="input-ethnika"
                />
              </label>

              <label className="flex items-end gap-2 rounded-xl border border-primary-300 bg-white px-4 py-3">
                <input
                  type="checkbox"
                  checked={showOnlyStock}
                  onChange={(event) => setShowOnlyStock(event.target.checked)}
                  className="h-4 w-4 accent-[#C6A75E]"
                />
                <span className="text-sm font-medium text-primary-900">
                  Solo disponibles
                </span>
              </label>

              <div className="flex items-end">
                <Button
                  width="full"
                  variant="secondary"
                  onClick={clearFavorites}
                  disabled={favoriteProducts.length === 0}
                >
                  Limpiar
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {favoriteProducts.length === 0 ? (
            <ScrollReveal direction="up" className="card-ethnika p-8 text-center">
              <h2 className="font-display text-3xl font-semibold text-primary-900">
                No tienes favoritos guardados
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-gray-700">
                Explora la tienda y marca los productos que te gusten para
                revisarlos despues.
              </p>
              <div className="mt-5">
                <Link to="/tienda">
                  <Button>Explorar tienda</Button>
                </Link>
              </div>
            </ScrollReveal>
          ) : filteredFavorites.length === 0 ? (
            <ScrollReveal direction="up" className="card-ethnika p-8 text-center">
              <h2 className="font-display text-3xl font-semibold text-primary-900">
                Sin coincidencias
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-gray-700">
                Ajusta tu busqueda o desactiva filtros para ver mas productos
                favoritos.
              </p>
            </ScrollReveal>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredFavorites.map((item, index) => (
                <ScrollReveal
                  key={item.id}
                  direction="up"
                  delay={index * 80}
                  className="card-ethnika flex flex-col p-5"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <Badge variant="default" tone="soft">
                      {item.categoria || item.category}
                    </Badge>
                    <Badge
                      variant={(item.stock || 0) > 0 ? 'success' : 'warning'}
                      tone="soft"
                      dot
                    >
                      {(item.stock || 0) > 0 ? 'Disponible' : 'Agotado'}
                    </Badge>
                  </div>

                  <h2 className="font-display text-2xl font-semibold text-primary-900">
                    {item.nombre || item.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-700">Por {item.artesano || item.artisan}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    {item.descripcion || item.description}
                  </p>

                  <p className="mt-4 font-display text-2xl font-bold text-primary-900">
                    {formatPrice(item.precio || item.price)}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <Link to={`/producto/${item.id}`}>
                      <Button width="full" size="sm" disabled={(item.stock || 0) <= 0}>
                        Ver detalle
                      </Button>
                    </Link>
                    <Button
                      width="full"
                      size="sm"
                      variant="secondary"
                      onClick={() => toggleFavorite(item.id)}
                    >
                      Quitar
                    </Button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Favoritos;
