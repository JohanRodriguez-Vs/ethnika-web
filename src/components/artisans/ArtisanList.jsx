import { useMemo } from 'react';
import ArtisanCard from './ArtisanCard';
import EmptyState from '../common/EmptyState';
import Loader from '../ui/Loader';

function ArtisanList({
  artisans = [],
  loading = false,
  error = null,
  columns = { mobile: 1, tablet: 2, desktop: 3, lg: 4 },
  spacing = 'gap-6',
  showAnimation = true,
}) {
  const validArtisans = useMemo(() => {
    return Array.isArray(artisans) ? artisans : [];
  }, [artisans]);

  const getGridClasses = () => {
    let gridClass = 'grid w-full';
    gridClass += ` grid-cols-${columns.mobile}`;
    gridClass += ` sm:grid-cols-${columns.tablet}`;
    gridClass += ` lg:grid-cols-${columns.desktop}`;
    if (columns.lg) gridClass += ` xl:grid-cols-${columns.lg}`;
    gridClass += ` ${spacing}`;
    return gridClass;
  };

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center py-16">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-16">
        <EmptyState
          title="Error al cargar artesanos"
          description={error || 'Ocurrió un error al cargar los artesanos. Intenta de nuevo.'}
          icon="⚠️"
        />
      </div>
    );
  }

  if (validArtisans.length === 0) {
    return (
      <div className="w-full py-16">
        <EmptyState
          title="No hay artesanos"
          description="No encontramos artesanos disponibles en este momento."
          icon="🔍"
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className={`${getGridClasses()} auto-rows-max`}>
        {validArtisans.map((artisan, index) => (
          <div
            key={artisan.id || index}
            className={`animate-fade-in ${showAnimation ? 'opacity-0' : 'opacity-100'}`}
            style={
              showAnimation
                ? {
                    animation: `fadeIn 0.6s ease-out forwards`,
                    animationDelay: `${index * 0.1}s`,
                  }
                : {}
            }
          >
            <ArtisanCard artisan={artisan} />
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-[#999999]">
          Mostrando{' '}
          <span className="font-semibold text-[#1A1A1A]">{validArtisans.length}</span>{' '}
          {validArtisans.length === 1 ? 'artesano' : 'artesanos'}
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
}

export default ArtisanList;
