import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const currentUrl = location.pathname + location.search;
    
    // Guardar la URL actual en localStorage para redirección después del login
    localStorage.setItem('ethnika_redirect_url', currentUrl);
    return <Navigate to="/login" state={{ from: currentUrl }} replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
