import { useMemo, useState, useCallback, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productService } from '../services/productService';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { formatPrice } from '../utils/formatPrice';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ScrollReveal from '../components/ui/ScrollReveal';

function Producto() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const product = useMemo(() => productService.getById(id), [id]);

  const variantTypes = useMemo(() => {
    if (!product?.variantes) return {};
    const groups = {};
    product.variantes.forEach((v) => {
      if (!groups[v.tipo]) groups[v.tipo] = [];
      if (!groups[v.tipo].includes(v.valor)) groups[v.tipo].push(v.valor);
    });
    return groups;
  }, [product]);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});

  useEffect(() => {
    const initial = {};
    Object.entries(variantTypes).forEach(([tipo, valores]) => {
      initial[tipo] = valores[0] || '';
    });
    setSelectedVariants(initial);
  }, [variantTypes]);

  const handleVariantChange = useCallback((tipo, valor) => {
    setSelectedVariants((prev) => ({ ...prev, [tipo]: valor }));
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!product || product.stock <= 0) return;
    addItem(product, selectedVariants, quantity);
  }, [product, selectedVariants, quantity, addItem]);

  const handleToggleFavorite = useCallback(() => {
    if (!product) return;
    toggleFavorite(product.id);
  }, [product, toggleFavorite]);

  const inStock = product ? product.stock > 0 : false;

  if (!product) {
    return (
      <section className="section-ethnika">
        <div className="container-ethnika">
          <div className="card-ethnika mx-auto max-w-xl p-8 text-center">
            <h1 className="font-display text-3xl font-bold text-primary-900">
              Producto no encontrado
            </h1>
            <p className="mt-3 text-sm text-gray-700">
              El producto que buscas no existe o fue removido del catalogo.
            </p>
            <div className="mt-5">
              <Link to="/tienda">
                <Button>Volver a tienda</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const totalPrice = product.precio * quantity;
  const isFavoriteProduct = isFavorite(product.id);
  const variantEntries = Object.entries(variantTypes);

  return (
    <div className="ethnika-page">
      <section className="section-ethnika">
        <div className="container-ethnika">
          <div className="mb-6">
            <Link
              to="/tienda"
              className="text-sm font-medium text-primary-800 transition-colors duration-300 hover:text-accent-gold"
            >
              ← Volver a tienda
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <ScrollReveal direction="up" className="card-ethnika p-5 md:p-6">
              <div className="relative overflow-hidden rounded-xl border border-primary-200 bg-gradient-to-br from-primary-200 via-primary-100 to-accent-gold/20 p-8">
                <div className="absolute right-4 top-4">
                  <Badge variant="default" tone="soft">
                    {product.categoria}
                  </Badge>
                </div>
                <div className="flex min-h-[400px] items-center justify-center">
                  {product.imagen ? (
                    <img
                      src={product.imagen}
                      alt={product.nombre}
                      fetchpriority="high"
                      className="h-full w-full rounded-lg object-contain"
                    />
                  ) : (
                    <p className="font-display text-3xl font-semibold text-primary-900">
                      {product.nombre}
                    </p>
                  )}
                </div>
              </div>

              {product.imagenes && product.imagenes.length > 1 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {product.imagenes.map((img, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-lg border border-primary-200 bg-white/80"
                    >
                      <img
                        src={img}
                        alt={`${product.nombre} vista ${i + 1}`}
                        loading="lazy"
                        className="h-20 w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </ScrollReveal>

            <ScrollReveal direction="left" className="space-y-5">
              <div className="space-y-2">
                <h1 className="font-display text-4xl font-bold text-primary-900">
                  {product.nombre}
                </h1>
                <p className="text-sm text-gray-700">Por {product.artesano}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <p className="font-display text-3xl font-bold text-primary-900">
                  {formatPrice(product.precio)}
                </p>
                {product.precioOriginal && product.precioOriginal > product.precio && (
                  <p className="font-display text-lg text-gray-500 line-through">
                    {formatPrice(product.precioOriginal)}
                  </p>
                )}
                <Badge
                  variant={inStock ? 'success' : 'warning'}
                  tone="soft"
                  dot
                >
                  {inStock ? product.disponibilidad || 'Disponible' : 'Agotado'}
                </Badge>
              </div>

              <p className="text-sm leading-relaxed text-gray-700">
                {product.descripcion}
              </p>

              <div className="card-ethnika p-4">
                <h2 className="font-display text-xl font-semibold text-primary-900">
                  Historia cultural
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {product.historia}
                </p>
              </div>

              {variantEntries.length > 0 && (
                <div className={`grid gap-4 ${variantEntries.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                  {variantEntries.map(([tipo, valores]) => (
                    <label key={tipo} className="space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-800">
                        {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                      </span>
                      <select
                        className="input-ethnika"
                        value={selectedVariants[tipo] || valores[0] || ''}
                        onChange={(event) => handleVariantChange(tipo, event.target.value)}
                        disabled={!inStock}
                      >
                        {valores.map((valor) => (
                          <option key={valor} value={valor}>
                            {valor}
                          </option>
                        ))}
                      </select>
                    </label>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-primary-900">
                  Cantidad
                </span>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-300 transition-colors duration-200 hover:border-accent-gold"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={!inStock}
                >
                  -
                </button>
                <span className="min-w-[2ch] text-center font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-300 transition-colors duration-200 hover:border-accent-gold"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  disabled={!inStock}
                >
                  +
                </button>
              </div>

              <div className="rounded-xl border border-primary-200 bg-white/80 p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-primary-800">
                  Total estimado
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-primary-900">
                  {formatPrice(totalPrice)}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  disabled={!inStock}
                  onClick={handleAddToCart}
                >
                  Anadir al carrito
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleToggleFavorite}
                >
                  {isFavoriteProduct ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                </Button>
              </div>

              <p className="text-xs text-gray-600">
                Artesano relacionado:{' '}
                <Link
                  to={`/artesano/${product.artesanoId}`}
                  className="font-semibold text-primary-900 underline decoration-accent-gold/70 underline-offset-4 hover:text-accent-gold"
                >
                  {product.artesano}
                </Link>
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Producto;
