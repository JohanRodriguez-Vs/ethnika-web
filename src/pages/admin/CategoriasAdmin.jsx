import SectionTitle from '../../components/common/SectionTitle';

function CategoriasAdmin() {
  return (
    <div className="container-ethnika section-ethnika">
      <SectionTitle align="left" subtitle="Administra las categorías del catálogo">
        Gestión de Categorías
      </SectionTitle>
      <p className="mt-4 text-sm text-gray-600">Crea, edita y elimina categorías de productos.</p>
    </div>
  );
}

export default CategoriasAdmin;
