import { Link } from 'react-router-dom';
import contacto from '../../data/contacto';

const FOOTER_LINKS = [
  { to: '/', label: 'Inicio', icon: 'home' },
  { to: '/tienda', label: 'Tienda', icon: 'shop' },
  { to: '/artesanos', label: 'Artesanos', icon: 'palette' },
  { to: '/sobre-nosotros', label: 'Sobre Nosotros', icon: 'info' },
  { to: '/login', label: 'Ingresar', icon: 'lock' },
];

// Iconos SVG estilizados
const IconHome = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const IconShop = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.16.12-.33.12-.5 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

const IconPalette = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-5 9c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm5.5-5c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-1 0-2.99.5-4 1.5.5.89.5 2.12 0 3 1 1 3 1.5 4 1.5 2.33 0 7-1.17 7-3.5V11h-7z" />
  </svg>
);

const IconInfo = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

const IconLock = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2l7 3.15V11c0 4.52-2.88 8.69-7 10-4.12-1.31-7-5.48-7-10V6.15L12 3z" />
  </svg>
);

const IconInstagram = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
  </svg>
);

const IconFacebook = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const IconTiktok = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.82 2.89 2.89 0 0 1 5.1-1.82V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.96-.08z" />
  </svg>
);

const IconWhatsapp = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.905 1.273c-1.473.813-2.786 1.982-3.756 3.355C1.9 10.638 1.5 12.289 1.5 13.961c0 1.634.37 3.226 1.073 4.676l-.713 2.593 2.656-.859a9.936 9.936 0 004.602 1.139h.004c5.441 0 9.852-4.41 9.852-9.852 0-2.631-.997-5.104-2.795-6.95-1.798-1.847-4.271-2.863-6.859-2.863" />
  </svg>
);

const getIconComponent = (iconName) => {
  const icons = {
    home: IconHome,
    shop: IconShop,
    palette: IconPalette,
    info: IconInfo,
    lock: IconLock,
    instagram: IconInstagram,
    facebook: IconFacebook,
    tiktok: IconTiktok,
    whatsapp: IconWhatsapp,
  };
  return icons[iconName];
};

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-primary-800 bg-primary-900 text-primary-100">
      <div className="container-ethnika py-6">
        {/* Sección principal */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-4">
          <section className="space-y-2">
            <h2 className="font-display text-lg font-bold">{contacto.empresa}</h2>
            <p className="max-w-sm text-xs leading-relaxed text-primary-300">
              Plataforma digital de comercio artesanal colombiano que conecta
              cultura, identidad y diseno contemporaneo.
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-gold">
              {contacto.lema}
            </p>
          </section>

          {/* Navegación con iconos SVG */}
          <section>
            <h3 className="mb-3 font-display text-sm font-semibold">Navegacion</h3>
            <div className="flex flex-wrap gap-3">
              {FOOTER_LINKS.map((item) => {
                const IconComponent = getIconComponent(item.icon);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group relative flex items-center justify-center w-8 h-8 rounded-full bg-primary-800 hover:bg-accent-gold/30 transition-all duration-300 text-primary-300 hover:text-accent-gold"
                    title={item.label}
                  >
                    <IconComponent />
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Contacto en formato texto */}
          <section>
            <h3 className="mb-3 font-display text-sm font-semibold">Contacto</h3>
            <ul className="space-y-1 text-xs text-primary-300">
              <li>{contacto.direccion}</li>
              <li>
                <a
                  href={`mailto:${contacto.email}`}
                  className="transition-colors duration-300 hover:text-accent-gold"
                >
                  {contacto.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contacto.telefono}`}
                  className="transition-colors duration-300 hover:text-accent-gold"
                >
                  {contacto.telefono}
                </a>
              </li>
            </ul>
          </section>

          {/* Comunidad con iconos SVG */}
          <section>
            <h3 className="mb-3 font-display text-sm font-semibold">Comunidad</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(contacto.redes).map(([key, url]) => {
                let IconComponent, label;
                switch (key) {
                  case 'instagram':
                    IconComponent = IconInstagram;
                    label = 'Instagram';
                    break;
                  case 'facebook':
                    IconComponent = IconFacebook;
                    label = 'Facebook';
                    break;
                  case 'tiktok':
                    IconComponent = IconTiktok;
                    label = 'TikTok';
                    break;
                  case 'whatsapp':
                    IconComponent = IconWhatsapp;
                    label = 'WhatsApp';
                    break;
                  default:
                    return null;
                }
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-800 hover:bg-accent-gold/30 transition-all duration-300 text-primary-300 hover:text-accent-gold"
                    title={label}
                    aria-label={`Visitar ${label}`}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </section>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-700 to-transparent" />

        <div className="flex flex-col gap-2 text-xs text-primary-400 sm:flex-row sm:items-center sm:justify-between pt-4">
          <p>© {year} {contacto.empresa}. Todos los derechos reservados.</p>
          <p>Hecho con identidad colombiana.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
