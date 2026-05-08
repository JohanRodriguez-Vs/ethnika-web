import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children = null, className = '' }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary-100 via-primary-100 to-earth-100 text-primary-900">
      <Navbar />

      <main
        id="main-content"
        className={`ethnika-page pt-20 ${className}`.trim()}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
