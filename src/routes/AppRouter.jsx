import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';

import Home from '../pages/Home';
import Tienda from '../pages/Tienda';
import Producto from '../pages/Producto';
import Carrito from '../pages/Carrito';
import Favoritos from '../pages/Favoritos';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Perfil from '../pages/Perfil';
import Artesanos from '../pages/Artesanos';
import ArtesanoDetalle from '../pages/ArtesanoDetalle';
import SobreNosotros from '../pages/SobreNosotros';
import NotFound from '../pages/NotFound';

import Dashboard from '../pages/admin/Dashboard';
import ProductosAdmin from '../pages/admin/ProductosAdmin';
import CategoriasAdmin from '../pages/admin/CategoriasAdmin';
import ArtesanosAdmin from '../pages/admin/ArtesanosAdmin';
import Configuracion from '../pages/admin/Configuracion';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tienda" element={<Tienda />} />
      <Route path="/producto/:id" element={<Producto />} />
      <Route
        path="/carrito"
        element={
          <ProtectedRoute>
            <Carrito />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favoritos"
        element={
          <ProtectedRoute>
            <Favoritos />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        }
      />
      <Route path="/artesanos" element={<Artesanos />} />
      <Route path="/artesano/:id" element={<ArtesanoDetalle />} />
      <Route path="/sobre-nosotros" element={<SobreNosotros />} />

      {/* Admin */}
      <Route
        path="/admin-ethnika-panel"
        element={
          <ProtectedRoute requireAdmin>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-ethnika-panel/productos"
        element={
          <ProtectedRoute requireAdmin>
            <ProductosAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-ethnika-panel/categorias"
        element={
          <ProtectedRoute requireAdmin>
            <CategoriasAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-ethnika-panel/artesanos"
        element={
          <ProtectedRoute requireAdmin>
            <ArtesanosAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-ethnika-panel/configuracion"
        element={
          <ProtectedRoute requireAdmin>
            <Configuracion />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
