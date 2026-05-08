import { useState, useEffect } from 'react';
import SectionTitle from '../../components/common/SectionTitle';

function ArtesanosAdmin() {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    import('../../data/artesanos.json').then((data) => {
      setArtisans(Array.isArray(data.default) ? data.default : []);
    }).catch(() => setArtisans([]));
  }, []);

  return (
    <div className="container-ethnika section-ethnika">
      <SectionTitle align="left" subtitle="Administra los perfiles de artesanos">
        Gestión de Artesanos
      </SectionTitle>
      <p className="mt-4 text-sm text-gray-600">{artisans.length} artesanos registrados.</p>
    </div>
  );
}

export default ArtesanosAdmin;
