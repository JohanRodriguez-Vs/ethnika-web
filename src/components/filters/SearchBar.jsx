import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X } from 'lucide-react';

function SearchBar({
  value = '',
  onChange,
  onClear,
  placeholder = 'Buscar productos artesanales...',
  debounceMs = 400,
  className = '',
}) {
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (debounceMs <= 0) {
      if (onChange) onChange(localValue);
      return;
    }

    const timer = setTimeout(() => {
      if (onChange) onChange(localValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, debounceMs, onChange]);

  const handleClear = useCallback(() => {
    setLocalValue('');
    inputRef.current?.focus();
    if (onChange) onChange('');
    if (onClear) onClear();
  }, [onChange, onClear]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        handleClear();
        inputRef.current?.blur();
      }
    },
    [handleClear]
  );

  return (
    <div className={`relative ${className}`}>
      <span
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary-400"
        aria-hidden="true"
      >
        <Search size={20} />
      </span>

      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Buscar productos"
        className="h-12 w-full rounded-xl border border-primary-300 bg-white pl-12 pr-12 text-sm text-primary-900 placeholder:text-primary-400 outline-none transition-all duration-200 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/30"
      />

      {localValue.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-lg text-primary-400 transition-colors duration-200 hover:bg-primary-200 hover:text-primary-900"
          aria-label="Limpiar búsqueda"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
