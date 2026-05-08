import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import artesanosData from '../data/artesanos.json';
import { productService } from '../services/productService';
import { formatPrice } from '../utils/formatPrice';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ScrollReveal from '../components/ui/ScrollReveal';
import AnimatedCounter from '../components/ui/AnimatedCounter';

function getRegion(ubicacion) {
  return ubicacion ? ubicacion.split(',')[0].trim() : '';
}

function getCity(ubicacion) {
  return ubicacion && ubicacion.includes(',') ? ubicacion.split(',').slice(1).join(',').trim() : '';
}

function getSpecialty(artesano) {
  if (!artesano.productos || artesano.productos.length === 0) return '';
  const firstProduct = productService.getById(artesano.productos[0]);
  return firstProduct ? firstProduct.categoria : '';
}

function ArtesanoDetalle() {
  const { id } = useParams();

  const artisan = useMemo(() => {
    const raw = artesanosData.find((item) => item.id === id);
    if (!raw) return null;

    return {
      id: raw.id,
      name: raw.nombre,
      region: getRegion(raw.ubicacion),
      city: getCity(raw.ubicacion),
      specialty: getSpecialty(raw),
      biography: raw.historia,
      productsCount: raw.productos ? raw.productos.length : 0,
      image: raw.imagen,
      process: raw.proceso
        ? raw.proceso.map((step) => step.descripcion)
        : [],
    };
  }, [id]);

  const relatedProducts = useMemo(() => {
    return productService.getByArtisan(id);
  }, [id]);

  if (!artisan) {
    return (
      <section className="section-ethnika">
        <div className="container-ethnika">
          <div className="card-ethnika mx-auto max-w-xl p-8 text-center">
            <h1 className="font-display text-3xl font-bold text-primary-900">
              Artesano no encontrado
            </h1>
            <p className="mt-3 text-sm text-gray-700">
              El perfil solicitado no esta disponible por el momento.
            </p>
            <div className="mt-5">
              <Link to="/artesanos">
                <Button>Volver a artesanos</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="ethnika-page">
      <section className="section-ethnika border-b border-primary-200">
        <div className="container-ethnika">
          <Link
            to="/artesanos"
            className="mb-6 inline-flex text-sm font-medium text-primary-800 transition-colors duration-300 hover:text-accent-gold"
          >
            ← Volver a artesanos
          </Link>

          {/* Sección principal: información grande */}
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] items-start">
            <ScrollReveal direction="up" className="flex items-center justify-center">
              <div className="aspect-[3/4] w-full max-w-sm rounded-xl overflow-hidden bg-[#F5F3EF] shadow-lg">
                <img
                  src={artisan.image}
                  alt={artisan.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/artisans/default-avatar.png';
                  }}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="gold" tone="soft">
                  {artisan.region}
                </Badge>
                {artisan.city && (
                  <Badge variant="default" tone="outline">
                    {artisan.city}
                  </Badge>
                )}
                {artisan.specialty && (
                  <Badge variant="default" tone="soft">
                    {artisan.specialty}
                  </Badge>
                )}
              </div>

              <h1 className="heading-section md:text-5xl">{artisan.name}</h1>

              <p className="max-w-2xl text-sm leading-relaxed text-gray-700 md:text-base">
                {artisan.biography}
              </p>

              <div className="card-ethnika p-6">
                <h2 className="font-display text-2xl font-semibold text-primary-900">
                  Proceso artesanal
                </h2>
                <ol className="mt-4 space-y-3">
                  {artisan.process.map((step) => (
                    <li
                      key={step}
                      className="rounded-xl border border-primary-200 bg-white/80 px-4 py-3 text-sm text-gray-700"
                    >
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Sección inferior: información pequeña (productos relacionados) */}
      <section className="section-ethnika bg-[#FAFAF8]">
        <div className="container-ethnika">
          <ScrollReveal direction="up" className="mb-6">
            <h2 className="heading-section text-2xl md:text-3xl">Productos asociados</h2>
            <p className="mt-2 text-sm text-gray-600">
              Explora piezas creadas por {artisan.name} dentro del catalogo de
              ETHNIKA BY COL.
            </p>
          </ScrollReveal>

          {relatedProducts.length === 0 ? (
            <ScrollReveal direction="up" className="card-ethnika p-8 text-center bg-white">
              <p className="text-sm text-gray-700">
                Este artesano aun no tiene productos publicados.
              </p>
            </ScrollReveal>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product, index) => (
                <ScrollReveal
                  key={product.id}
                  direction="up"
                  delay={index * 50}
                  className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="mb-3">
                    <div className="aspect-square w-full h-32 mb-2 rounded-lg overflow-hidden bg-[#F5F3EF]">
                      <img
                        src={product.imagen}
                        alt={product.nombre}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          e.target.src = '/images/products/default-product.png';
                        }}
                      />
                    </div>
                    
                    <Badge variant="default" tone="soft" className="text-xs mb-2">
                      {product.categoria}
                    </Badge>
                  </div>
                  <h3 className="font-display text-sm font-semibold text-primary-900 mb-1 line-clamp-2">
                    {product.nombre}
                  </h3>
                  <p className="text-sm font-bold text-primary-900 mb-3">
                    {formatPrice(product.precio)}
                  </p>
                  <div className="mt-auto">
                    <Link to={`/producto/${product.id}`}>
                      <Button width="full" size="sm">Ver producto</Button>
                    </Link>
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

export default ArtesanoDetalle;
