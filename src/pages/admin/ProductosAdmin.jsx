import { useState, useEffect } from 'react';
import SectionTitle from '../../components/common/SectionTitle';
import { productService } from '../../services/productService';

function ProductosAdmin() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productoService.getAll?.() || []);
  }, []);

  return (
    <div className="container-ethnika section-ethnika">
      <SectionTitle align="left" subtitle="Administra los productos artesanales">
        Gestión de Productos
      </SectionTitle>
      <p className="mt-4 text-sm text-gray-600">{products.length} productos registrados.</p>
    </div>
  );
}

export default ProductosAdmin;
