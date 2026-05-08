import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/ui/ScrollReveal';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import ProductCard from '../components/product/ProductCard';
import { useCart } from '../hooks/useCart';
import { productService } from '../services/productService';
import artesanosData from '../data/artesanos.json';

const featuredCategories = [
  {
    title: 'Textiles',
    description: 'Tejidos tradicionales con identidad colombiana.',
  },
  {
    title: 'Accesorios',
    description: 'Piezas unicas elaboradas por manos artesanas.',
  },
  {
    title: 'Decoracion',
    description: 'Elementos culturales para espacios con historia.',
  },
];

const artisans = artesanosData
  .filter(artesano => artesano.destacado)
  .slice(0, 3)
  .map(artesano => ({
    id: artesano.id,
    name: artesano.nombre,
    region: artesano.ubicacion,
    specialty: (() => {
      if (!artesano.productos || artesano.productos.length === 0) return '';
      const firstProduct = productService.getById(artesano.productos[0]);
      return firstProduct ? firstProduct.categoria : '';
    })(),
    image: artesano.imagen,
  }));

const reviews = [
  {
    id: 1,
    name: 'Camila López',
    rating: 5,
    text: 'La calidad y autenticidad de las piezas es extraordinaria. Apoyar a los artesanos nunca fue tan fácil.',
    avatar: '👩‍🦰',
  },
  {
    id: 2,
    name: 'Juan Rodríguez',
    rating: 5,
    text: 'Plataforma excepcional que conecta directamente con la identidad cultural de Colombia.',
    avatar: '👨‍💼',
  },
  {
    id: 3,
    name: 'María González',
    rating: 5,
    text: 'Cada producto cuenta una historia. Estoy fascinada con mi compra y la experiencia completa.',
    avatar: '👩‍🦱',
  },
  {
    id: 4,
    name: 'David Martinez',
    rating: 5,
    text: 'Excelente atención al cliente y los productos superan las expectativas completamente.',
    avatar: '👨‍🦲',
  },
  {
    id: 5,
    name: 'Sofia Morales',
    rating: 5,
    text: 'Una experiencia inmersiva que celebra el arte y la tradición colombiana de forma única.',
    avatar: '👩‍🦯',
  },
  {
    id: 6,
    name: 'Carlos Herrera',
    rating: 5,
    text: 'La plataforma es fácil de usar y la calidad de los productos es insuperable. ¡Recomendada al 100%!',
    avatar: '👨‍🦳',
  }
];

function Home() {
  const { addItem } = useCart();
  const allProducts = productService.getAll();
  const featuredProducts = allProducts.filter((p) => p.destacado).slice(0, 3);

  return (
    <div className="ethnika-page">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(2deg); }
          66% { transform: translateY(6px) rotate(-1deg); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.08); }
        }
        @keyframes drift {
          0% { transform: translateX(0); }
          50% { transform: translateX(20px); }
          100% { transform: translateX(0); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.6; }
        }
        @keyframes spin-very-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .anim-float { animation: float 7s ease-in-out infinite; }
        .anim-float-2 { animation: float 9s ease-in-out infinite reverse; }
        .anim-float-3 { animation: float 8s ease-in-out infinite 2s; }
        .anim-pulse { animation: pulse-soft 4s ease-in-out infinite; }
        .anim-pulse-2 { animation: pulse-soft 5s ease-in-out infinite 1s; }
        .anim-drift { animation: drift 11s ease-in-out infinite; }
        .anim-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .anim-twinkle-2 { animation: twinkle 4s ease-in-out infinite 1.5s; }
        .anim-spin { animation: spin-very-slow 22s linear infinite; }
        .anim-spin-2 { animation: spin-very-slow 28s linear infinite reverse; }
      `}</style>
      <section className="section-ethnika relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
               style={{
                 backgroundImage: 'url(/images/hero/artesania-fondo.jpg)'
               }} />
          {/* División diagonal con desvanecido solo en lado izquierdo */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent hero-overlay" 
                 style={{
                   clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0% 100%)'
                 }} />
          </div>
          <style>{`
            @media (max-width: 1023px) {
              .hero-overlay {
                clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%) !important;
              }
            }
          `}</style>
        </div>
        <div className="container-ethnika relative">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <ScrollReveal direction="up" className="space-y-6">
              <p className="inline-flex rounded-full border border-accent-gold/40 bg-accent-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent-gold">
                Esencia que conecta
              </p>

              <h1 className="heading-hero">
                Artesania colombiana con alma, historia y diseño contemporaneo.
              </h1>

              <p className="text-base max-w-xl text-black md:text-lg">
                ETHNIKA BY COL transforma la compra artesanal en una experiencia
                cultural inmersiva, conectando al cliente con el territorio, el
                proceso y las manos que crean cada pieza.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link to="/tienda">
                  <Button size="lg">Explorar tienda</Button>
                </Link>
                <Link to="/sobre-nosotros">
                  <Button variant="secondary" size="lg">
                    Conocer la marca
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
            <div></div>
          </div>
        </div>
      </section>

      <section className="section-ethnika py-12 md:py-16">
        <div className="container-ethnika">
          <ScrollReveal direction="up" className="mb-8">
            <div className="card-ethnika relative overflow-hidden p-8 md:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-200 via-primary-100 to-accent-gold/25" />
              <div className="relative">
                <div className="text-center mb-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary-800">
                    Experiencia cultural digital
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold text-primary-900 md:text-4xl">
                    Tradicion y modernidad en una sola vitrina.
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ScrollReveal direction="up" delay={100} className="group">
                    <div className="rounded-xl border border-primary-300/80 bg-white/80 p-6 text-center transition-all duration-300 hover:scale-105 hover:bg-white/90 hover:shadow-lg">
                      <p className="font-display text-3xl font-bold text-primary-900 mb-2">
                        <AnimatedCounter value={120} suffix="+" />
                      </p>
                      <p className="text-sm text-gray-700">Productos</p>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal direction="up" delay={200} className="group">
                    <div className="rounded-xl border border-primary-300/80 bg-white/80 p-6 text-center transition-all duration-300 hover:scale-105 hover:bg-white/90 hover:shadow-lg">
                      <p className="font-display text-3xl font-bold text-primary-900 mb-2">
                        <AnimatedCounter value={35} suffix="+" />
                      </p>
                      <p className="text-sm text-gray-700">Artesanos</p>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal direction="up" delay={300} className="group">
                    <div className="rounded-xl border border-primary-300/80 bg-white/80 p-6 text-center transition-all duration-300 hover:scale-105 hover:bg-white/90 hover:shadow-lg">
                      <p className="font-display text-3xl font-bold text-primary-900 mb-2">
                        <AnimatedCounter value={9} />
                      </p>
                      <p className="text-sm text-gray-700">Regiones</p>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-ethnika border-y border-primary-200 bg-gradient-to-b from-primary-100 to-primary-200/60 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-28 h-28 border-2 border-accent-gold/40 rotate-45 anim-float"></div>
          <div className="absolute top-1/4 right-12 w-20 h-20 border-2 border-primary-400/40 rounded-full anim-pulse"></div>
          <div className="absolute bottom-12 left-1/4 w-4 h-4 rounded-full bg-earth-500/40 anim-twinkle"></div>
          <div className="absolute top-1/3 left-20 w-3 h-3 rounded-full bg-coffee-400/40 anim-twinkle-2"></div>
        </div>
        <div className="container-ethnika">
          <ScrollReveal direction="up" className="mb-8 text-center">
            <h2 className="heading-section">Categorias destacadas</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lead">
              Descubre colecciones curadas para conectar con la riqueza
              artesanal de Colombia.
            </p>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-3">
            {featuredCategories.map((category, index) => (
              <ScrollReveal
                key={category.title}
                direction="up"
                delay={index * 120}
                className="card-ethnika p-6"
              >
                <h3 className="font-display text-2xl font-semibold text-primary-900">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {category.description}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-ethnika border-y border-primary-200 bg-gradient-to-b from-primary-200/40 to-primary-100 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -bottom-12 -right-12 w-36 h-36 border border-accent-gold/40 rounded-full anim-spin"></div>
          <div className="absolute top-8 right-1/4 w-6 h-6 rounded-full border-2 border-earth-500/40 anim-pulse-2"></div>
          <div className="absolute bottom-1/3 left-8 w-5 h-5 rounded-full bg-coffee-400/40 anim-float-2"></div>
        </div>
        <div className="container-ethnika">
          <ScrollReveal direction="up" className="mb-8 text-center">
            <h2 className="heading-section">Productos destacados</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lead">
              Descubre piezas seleccionadas que representan lo mejor de la
              artesania colombiana.
            </p>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <ScrollReveal
                key={product.id}
                direction="up"
                delay={index * 120}
              >
                <ProductCard
                  product={product}
                  onAddToCart={(prod) => addItem(prod, {}, 1)}
                />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" className="mt-10 text-center">
            <Link to="/tienda">
              <Button variant="secondary" size="lg">
                Ver todos los productos
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-ethnika py-6 md:py-8 lg:py-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-8 top-1/4 w-20 h-20 border-2 border-earth-500/40 rotate-45 anim-float-3"></div>
          <div className="absolute right-8 bottom-12 w-24 h-24 border border-accent-gold/40 rounded-full anim-drift"></div>
          <div className="absolute top-8 left-1/2 w-3 h-3 rounded-full bg-accent-gold/40 anim-twinkle"></div>
        </div>
        <div className="container-ethnika">
          <ScrollReveal direction="up" className="mb-8 text-center">
            <h2 className="heading-section">Artesanos destacados</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lead">
              Historias reales, procesos autenticos y piezas que preservan la
              memoria cultural.
            </p>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-3">
            {artisans.map((artisan, index) => (
              <ScrollReveal
                key={artisan.id}
                direction="up"
                delay={index * 120}
                className="card-ethnika p-6"
              >
                <div className="mb-4">
                  <div className="w-full mb-3 rounded-lg overflow-hidden bg-[#F5F3EF]">
                    <img
                      src={artisan.image}
                      alt={artisan.name}
                      className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.target.src = '/images/artisans/default-avatar.png';
                      }}
                    />
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold text-primary-900">
                  {artisan.name}
                </h3>
                <p className="mt-2 text-sm text-gray-700">{artisan.region}</p>
                <p className="mt-1 text-sm font-medium text-accent-gold">
                  {artisan.specialty}
                </p>
                <div className="mt-4">
                  <Link to={`/artesano/${artisan.id}`}>
                    <Button width="full" size="sm">
                      Ver perfil
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" className="mt-10 text-center">
            <Link to="/artesanos">
              <Button variant="secondary" size="lg">
                Ver todos los artesanos
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-ethnika py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 left-8 w-16 h-16 border-2 border-accent-gold/40 rotate-45 anim-spin-2"></div>
          <div className="absolute -bottom-8 right-1/3 w-32 h-32 border border-earth-500/40 rounded-full anim-pulse"></div>
          <div className="absolute top-1/3 right-20 w-4 h-4 rounded-full bg-coffee-400/40 anim-float"></div>
          <div className="absolute bottom-1/4 left-12 w-3 h-3 rounded-full bg-accent-gold/40 anim-twinkle-2"></div>
        </div>
        <div className="container-ethnika">
          <ScrollReveal direction="up" className="mb-8 text-center">
            <h2 className="heading-section">Lo que dicen nuestros clientes</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lead">
              Experiencias reales de personas que celebran la artesania
              colombiana.
            </p>
          </ScrollReveal>

          <div className="relative overflow-hidden">
            <style>{`
              @keyframes scrollLeft {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .scroll-animation {
                animation: scrollLeft 30s linear infinite;
              }
            `}</style>

            <div className="flex gap-5" style={{ width: 'fit-content' }}>
              {[...reviews, ...reviews].map((review, index) => (
                <div
                  key={`${review.id}-${index}`}
                  className="scroll-animation flex-shrink-0 w-80 card-ethnika p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{review.avatar}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-primary-900">
                          {review.name}
                        </h3>
                      </div>
                      <div className="flex gap-1 mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className="text-accent-gold">
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 italic">
                        "{review.text}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
