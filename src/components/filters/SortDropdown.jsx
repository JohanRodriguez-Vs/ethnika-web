import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'default', label: 'Relevancia' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'newest', label: 'Más recientes' },
];

function getOptionLabel(value) {
  const opt = SORT_OPTIONS.find((o) => o.value === value);
  return opt ? opt.label : 'Ordenar por';
}

function SortDropdown({
  value = 'default',
  onChange,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, handleClickOutside]);

  const handleSelect = (val) => {
    if (onChange) onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex h-11 items-center gap-2 rounded-xl border border-primary-300 bg-white px-4 text-sm font-medium text-primary-900 transition-all duration-200 hover:border-accent-gold hover:ring-2 hover:ring-accent-gold/30"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Ordenar productos"
      >
        <span>{getOptionLabel(value)}</span>
        <ChevronDown
          size={16}
          className={`text-primary-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Opciones de ordenamiento"
          className="absolute right-0 top-full z-50 mt-1.5 w-56 overflow-hidden rounded-xl border border-primary-200 bg-white shadow-elegant-lg animate-fade-in"
        >
          {SORT_OPTIONS.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li key={opt.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors duration-200 ${
                    isSelected
                      ? 'bg-accent-gold/10 font-semibold text-accent-gold'
                      : 'text-primary-900 hover:bg-primary-200/70'
                  }`}
                >
                  {opt.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SortDropdown;
