import SectionTitle from '../../components/common/SectionTitle';
import contacto from '../../data/contacto';

function Configuracion() {
  return (
    <div className="container-ethnika section-ethnika">
      <SectionTitle align="left" subtitle="Ajustes generales de la plataforma">
        Configuración
      </SectionTitle>
      <p className="mt-4 text-sm text-gray-600">
        WhatsApp: {contacto.whatsapp} | Email: {contacto.email}
      </p>
    </div>
  );
}

export default Configuracion;
