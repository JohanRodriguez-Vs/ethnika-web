import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ScrollReveal from '../components/ui/ScrollReveal';
import AnimatedCounter from '../components/ui/AnimatedCounter';

const VALUES = [
  {
    title: 'Preservacion cultural',
    description:
      'Impulsamos tradiciones artesanales para que sigan vivas y visibles en el entorno digital.',
  },
  {
    title: 'Conexion humana',
    description:
      'Cada producto nace de una historia real y de manos que representan identidad y territorio.',
  },
  {
    title: 'Comercio con identidad',
    description:
      'No vendemos solo objetos: compartimos piezas con significado cultural y emocional.',
  },
  {
    title: 'Elegancia artesanal',
    description:
      'Fusionamos la esencia tradicional con una experiencia visual moderna y sofisticada.',
  },
];

const TIMELINE = [
  {
    title: 'Inspiracion y origen',
    detail:
      'Nace la idea de crear una vitrina digital para artesanos colombianos con enfoque cultural.',
  },
  {
    title: 'Diseno del concepto',
    detail:
      'Se define la identidad de marca bajo la idea "Esencia que conecta".',
  },
  {
    title: 'Construccion de plataforma',
    detail:
      'Se desarrolla la experiencia web con enfoque en narrativa, usabilidad y conversion.',
  },
  {
    title: 'Escalabilidad futura',
    detail:
      'Preparacion para integraciones de pagos, autenticacion avanzada y expansion internacional.',
  },
];

function SobreNosotros() {
  return (
    <div className="ethnika-page">
      <section className="section-ethnika border-b border-primary-200">
        <div className="container-ethnika grid items-center gap-10 lg:grid-cols-2">
          <ScrollReveal direction="up" className="space-y-5">
            <Badge variant="gold" tone="soft">
              Sobre ETHNIKA BY COL
            </Badge>

            <h1 className="heading-section md:text-5xl">
              Una plataforma que conecta cultura, artesania y diseno.
            </h1>

            <p className="text-lead max-w-2xl">
              ETHNIKA BY COL surge para visibilizar el valor cultural del trabajo
              artesanal colombiano y transformarlo en una experiencia digital
              inmersiva, elegante y cercana.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/tienda">
                <Button size="lg">Explorar tienda</Button>
              </Link>
              <Link to="/artesanos">
                <Button variant="secondary" size="lg">
                  Conocer artesanos
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" className="card-ethnika p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-primary-200 bg-white/80 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.12em] text-primary-800">
                  Artesanos aliados
                </p>
                <p className="mt-1 font-display text-4xl font-bold text-primary-900">
                  <AnimatedCounter value={35} suffix="+" />
                </p>
              </div>
              <div className="rounded-xl border border-primary-200 bg-white/80 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.12em] text-primary-800">
                  Productos culturales
                </p>
                <p className="mt-1 font-display text-4xl font-bold text-primary-900">
                  <AnimatedCounter value={120} suffix="+" />
                </p>
              </div>
              <div className="rounded-xl border border-primary-200 bg-white/80 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.12em] text-primary-800">
                  Regiones activas
                </p>
                <p className="mt-1 font-display text-4xl font-bold text-primary-900">
                  <AnimatedCounter value={9} />
                </p>
              </div>
              <div className="rounded-xl border border-primary-200 bg-white/80 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.12em] text-primary-800">
                  Pedidos atendidos
                </p>
                <p className="mt-1 font-display text-4xl font-bold text-primary-900">
                  <AnimatedCounter value={500} suffix="+" />
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-ethnika">
        <div className="container-ethnika">
          <ScrollReveal direction="up" className="mb-8 text-center">
            <h2 className="heading-section">Nuestra razon de ser</h2>
            <p className="mx-auto mt-3 max-w-3xl text-lead">
              Construimos un puente entre el territorio y el mundo digital para
              dignificar el oficio artesanal y crear experiencias de compra con
              significado cultural.
            </p>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-2">
            <ScrollReveal direction="up" className="card-ethnika p-6">
              <h3 className="font-display text-2xl font-semibold text-primary-900">
                Mision
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">
                Promover, exhibir y comercializar artesanias colombianas
                autenticas mediante una plataforma digital innovadora, centrada
                en experiencia visual, narrativa cultural y conexion humana.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={120} className="card-ethnika p-6">
              <h3 className="font-display text-2xl font-semibold text-primary-900">
                Vision
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">
                Ser referente nacional e internacional en comercio artesanal
                digital, integrando tecnologia, cultura y diseno para posicionar
                el trabajo artesanal como simbolo de identidad y valor.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-ethnika border-y border-primary-200 bg-white/50">
        <div className="container-ethnika">
          <ScrollReveal direction="up" className="mb-8 text-center">
            <h2 className="heading-section">Valores de marca</h2>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-2">
            {VALUES.map((value, index) => (
              <ScrollReveal
                key={value.title}
                direction="up"
                delay={index * 80}
                className="card-ethnika p-6"
              >
                <h3 className="font-display text-2xl font-semibold text-primary-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700 md:text-base">
                  {value.description}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-ethnika">
        <div className="container-ethnika grid gap-8 lg:grid-cols-2">
          <ScrollReveal direction="up" className="space-y-4">
            <h2 className="heading-section">Camino del proyecto</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-gray-700 md:text-base">
              ETHNIKA BY COL evoluciona como una plataforma escalable que inicia
              con pedidos por WhatsApp y avanza hacia un ecosistema de comercio
              digital completo.
            </p>
          </ScrollReveal>

          <div className="space-y-3">
            {TIMELINE.map((item, index) => (
              <ScrollReveal
                key={item.title}
                direction="left"
                delay={index * 90}
                className="card-ethnika p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-gold">
                  Etapa {index + 1}
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-primary-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700 md:text-base">
                  {item.detail}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SobreNosotros;
