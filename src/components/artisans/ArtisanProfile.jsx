import { useState } from 'react';
import { MapPin, Quote, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';

function ArtisanProfile({ artisan = {}, products = [] }) {
  const [imageError, setImageError] = useState(false);

  const {
    id = 'art-001',
    nombre = 'Artesano',
    ubicacion = 'Colombia',
    imagen = 'https://images.unsplash.com/photo-1552878917-5ff99ce58718?w=800&h=800&fit=crop',
    historia = '',
    filosofia = '',
    proceso = [],
  } = artisan;

  const hasProceso = Array.isArray(proceso) && proceso.length > 0;
  const hasProducts = Array.isArray(products) && products.length > 0;

  const handleImageError = () => setImageError(true);

  const imageSrc = imageError
    ? 'https://images.unsplash.com/photo-1552878917-5ff99ce58718?w=800&h=800&fit=crop'
    : imagen;

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl bg-[#F5F3EF]">
        <div className="flex flex-col lg:flex-row">
          <div className="relative aspect-square w-full lg:w-2/5 lg:aspect-auto lg:min-h-[500px] overflow-hidden">
            <img
              src={imageSrc}
              alt={nombre}
              onError={handleImageError}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/40 to-transparent" />
          </div>

          <div className="flex flex-1 flex-col justify-center px-6 py-10 lg:px-12 lg:py-16">
            <div className="max-w-xl">
              <h1 className="font-playfair text-3xl font-bold text-[#1A1A1A] lg:text-4xl">
                {nombre}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-sm text-[#8B7355]">
                <MapPin size={16} />
                <span>{ubicacion}</span>
              </div>

              {filosofia && (
                <div className="mt-6 border-l-2 border-[#C6A75E] pl-4">
                  <Quote size={18} className="text-[#C6A75E]" />
                  <p className="mt-1 font-playfair text-lg italic leading-relaxed text-[#666666]">
                    {filosofia}
                  </p>
                </div>
              )}

              {historia && (
                <p className="mt-6 text-sm leading-relaxed text-[#999999]">
                  {historia}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESO ARTESANAL */}
      {hasProceso && (
        <section className="mt-16">
          <h2 className="font-playfair text-2xl font-bold text-[#1A1A1A]">
            Proceso Artesanal
          </h2>
          <p className="mt-2 text-sm text-[#999999]">
            Conoce cómo {nombre} crea cada pieza única.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {proceso.map((step, idx) => (
              <div
                key={idx}
                className="group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
              >
                {step.imagen && (
                  <div className="aspect-[4/3] overflow-hidden bg-[#F5F3EF]">
                    <img
                      src={step.imagen}
                      alt={step.titulo || `Paso ${idx + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-5">
                  <span className="text-xs font-semibold text-[#C6A75E]">
                    Paso {idx + 1}
                  </span>
                  <h3 className="mt-1 font-playfair text-base font-semibold text-[#1A1A1A]">
                    {step.titulo}
                  </h3>
                  {step.descripcion && (
                    <p className="mt-2 text-sm leading-relaxed text-[#999999]">
                      {step.descripcion}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PRODUCTOS RELACIONADOS */}
      {hasProducts && (
        <section className="mt-16">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-[#1A1A1A]">
                Productos de {nombre}
              </h2>
              <p className="mt-2 text-sm text-[#999999]">
                Piezas creadas por este artesano.
              </p>
            </div>

            {products.length > 4 && (
              <Link
                to={`/tienda?artesano=${id}`}
                className="hidden items-center gap-1 text-sm font-semibold text-[#C6A75E] transition-colors hover:text-[#8B7355] sm:inline-flex"
              >
                Ver todos
                <ChevronRight size={16} />
              </Link>
            )}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {products.length > 4 && (
            <div className="mt-8 text-center sm:hidden">
              <Link
                to={`/tienda?artesano=${id}`}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-[#C6A75E] px-6 py-3 text-sm font-semibold text-[#C6A75E] transition-all duration-300 hover:bg-[#C6A75E] hover:text-white"
              >
                Ver todos los productos
                <ChevronRight size={18} />
              </Link>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default ArtisanProfile;
