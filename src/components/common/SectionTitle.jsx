import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function SectionTitle({
  children,
  subtitle,
  linkTo,
  linkLabel = 'Ver todo',
  align = 'center',
  className = '',
}) {
  const alignClass =
    align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';

  return (
    <div className={`${alignClass} ${className}`}>
      <h2 className="font-playfair text-2xl font-bold text-[#1A1A1A] sm:text-3xl lg:text-4xl">
        {children}
      </h2>

      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-[#999999] sm:text-base">
          {subtitle}
        </p>
      )}

      {linkTo && (
        <div className="mt-4">
          <Link
            to={linkTo}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C6A75E] transition-colors duration-300 hover:text-[#8B7355]"
          >
            {linkLabel}
            <ChevronRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default SectionTitle;
