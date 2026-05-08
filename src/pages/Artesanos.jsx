import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import artesanosData from '../data/artesanos.json';
import { productService } from '../services/productService';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ScrollReveal from '../components/ui/ScrollReveal';
import AnimatedCounter from '../components/ui/AnimatedCounter';

function getRegion(ubicacion) {
  return ubicacion ? ubicacion.split(',')[0].trim() : '';
}

function getCity(ubicacion) {
  return ubicacion && ubicacion.includes(',') ? ubicacion.split(',')[1].trim() : '';
}

function getLocationWithoutColombia(ubicacion) {
  if (!ubicacion) return '';
  const parts = ubicacion.split(',').map(part => part.trim());
  // Eliminar "Colombia" si está presente
  return parts.filter(part => part.toLowerCase() !== 'colombia').join(', ');
}

function getSpecialty(artesano) {
  if (!artesano.productos || artesano.productos.length === 0) return '';
  const firstProduct = productService.getById(artesano.productos[0]);
  return firstProduct ? firstProduct.categoria : '';
}

const ARTISANS = artesanosData.map((a) => ({
  id: a.id,
  name: a.nombre,
  region: getRegion(a.ubicacion),
  city: getCity(a.ubicacion),
  specialty: getSpecialty(a),
  products: a.productos ? a.productos.length : 0,
  story: a.historia,
  image: a.imagen,
  location: getLocationWithoutColombia(a.ubicacion),
}));

function Artesanos() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('Todas');

  const regions = useMemo(
    () => ['Todas', ...new Set(ARTISANS.map((artisan) => artisan.region))],
    []
  );

  const filteredArtisans = useMemo(() => {
    const term = search.trim().toLowerCase();

    return ARTISANS.filter((artisan) => {
      const byRegion = region === 'Todas' || artisan.region === region;
      const bySearch =
        !term ||
        artisan.name.toLowerCase().includes(term) ||
        artisan.specialty.toLowerCase().includes(term) ||
        artisan.city.toLowerCase().includes(term) ||
        artisan.region.toLowerCase().includes(term);

      return byRegion && bySearch;
    });
  }, [search, region]);

  const totalProducts = useMemo(
    () => ARTISANS.reduce((acc, artisan) => acc + artisan.products, 0),
    []
  );

  return (
    <div className="ethnika-page">
      <section className="section-ethnika border-b border-primary-200">
        <div className="container-ethnika space-y-8">
          <ScrollReveal direction="up" className="text-center">
            <h1 className="heading-section md:text-5xl">Artesanos</h1>
            <p className="mx-auto mt-3 max-w-2xl text-lead">
              Conoce a las personas que dan vida a cada pieza. Detras de cada
              producto hay historia, territorio y oficio.
            </p>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ScrollReveal direction="up" className="card-ethnika p-4 text-center">
              <p className="text-xs uppercase tracking-[0.12em] text-primary-800">
                Artesanos activos
              </p>
              <p className="mt-1 font-display text-4xl font-bold text-primary-900">
                <AnimatedCounter value={ARTISANS.length} />
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100} className="card-ethnika p-4 text-center">
              <p className="text-xs uppercase tracking-[0.12em] text-primary-800">
                Productos publicados
              </p>
              <p className="mt-1 font-display text-4xl font-bold text-primary-900">
                <AnimatedCounter value={totalProducts} />
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200} className="card-ethnika p-4 text-center">
              <p className="text-xs uppercase tracking-[0.12em] text-primary-800">
                Regiones representadas
              </p>
              <p className="mt-1 font-display text-4xl font-bold text-primary-900">
                <AnimatedCounter value={regions.length - 1} />
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" className="card-ethnika p-4 md:p-5">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-800">
                  Buscar artesano
                </span>
                <input
                  type="text"
                  className="input-ethnika"
                  placeholder="Nombre, especialidad o ciudad"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-800">
                  Filtrar por region
                </span>
                <select
                  className="input-ethnika"
                  value={region}
                  onChange={(event) => setRegion(event.target.value)}
                >
                  {regions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-ethnika">
        <div className="container-ethnika">
          {filteredArtisans.length === 0 ? (
            <ScrollReveal direction="up" className="card-ethnika p-8 text-center">
              <h2 className="font-display text-3xl font-semibold text-primary-900">
                No hay resultados
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-gray-700">
                Prueba con otro termino o cambia la region para descubrir mas
                perfiles.
              </p>
            </ScrollReveal>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredArtisans.map((artisan, index) => (
                <ScrollReveal
                  key={artisan.id}
                  direction="up"
                  delay={index * 70}
                  className="card-ethnika flex flex-col p-5 group"
                >
                  <div className="relative overflow-hidden bg-[#F5F3EF] aspect-square rounded-lg mb-4">
                    <img
                      src={artisan.image}
                      alt={artisan.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = '/images/artisans/default-avatar.png';
                      }}
                    />
                    
                    {/* Overlay de gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                    
                    {/* Badge de región */}
                    <div className="absolute top-3 left-3 z-10">
                      <Badge
                        text={artisan.region}
                        variant="gold"
                        className="bg-[#C6A75E] text-white text-xs font-semibold px-3 py-1"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col p-4">
                    <h2 className="text-lg font-bold text-[#1A1A1A] line-clamp-2 leading-tight mb-1">
                      {artisan.name}
                    </h2>
                    {artisan.specialty && (
                      <p className="text-xs text-[#8B7355] font-medium mb-3">
                        {artisan.specialty}
                      </p>
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-[#666666]">
                        {artisan.products} {artisan.products === 1 ? 'producto' : 'productos'}
                      </span>
                      <Badge variant="default" tone="outline" className="text-xs">
                        {artisan.location}
                      </Badge>
                    </div>

                    <div className="flex-1"></div>

                    <Link
                      to={`/artesano/${artisan.id}`}
                      className="flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-300 text-white bg-[#1A1A1A] hover:bg-[#333333] text-center"
                    >
                      Ver más detalles
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

export default Artesanos;
