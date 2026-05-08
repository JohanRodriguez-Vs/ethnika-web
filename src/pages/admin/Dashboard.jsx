import { Link } from 'react-router-dom';
import SectionTitle from '../../components/common/SectionTitle';

function Dashboard() {
  return (
    <div className="container-ethnika section-ethnika">
      <SectionTitle
        align="left"
        subtitle="Panel de administración de ETHNIKA BY COL"
      >
        Dashboard
      </SectionTitle>
      <p className="mt-4 text-sm text-gray-600">Selecciona una opción del menú lateral para gestionar el contenido.</p>
    </div>
  );
}

export default Dashboard;
