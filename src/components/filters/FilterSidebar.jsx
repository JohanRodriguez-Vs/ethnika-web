import { useState, useCallback } from 'react';
import { X, SlidersHorizontal, RotateCcw, ChevronDown } from 'lucide-react';

const CATEGORIES = [
  { id: 'textiles', label: 'Textiles' },
  { id: 'joyeria', label: 'Joyería Artesanal' },
  { id: 'decoracion', label: 'Decoración' },
  { id: 'bolsos-mochilas', label: 'Bolsos y Mochilas' },
  { id: 'ceramica', label: 'Cerámica' },
  { id: 'accesorios', label: 'Accesorios Culturales' },
];

const SORT_OPTIONS = [
  { value: 'default', label: 'Relevancia' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'newest', label: 'Más recientes' },
];

function FilterSidebar({
  filters = {},
  onFilterChange,
  onSortChange,
  onClearFilters,
  sortBy = 'default',
  isOpen = false,
  onClose,
}) {
  const [showPriceFilter, setShowPriceFilter] = useState(true);
  const [showCategoryFilter, setShowCategoryFilter] = useState(true);

  const activeCount = Object.values(filters).filter(
    (v) => v !== undefined && v !== '' && (typeof v !== 'object' || Object.keys(v).length > 0)
  ).length;

  const selectedCategories = filters.categories || [];
  const minPrice = filters.minPrice || '';
  const maxPrice = filters.maxPrice || '';
  const inStock = filters.inStock;

  const toggleCategory = useCallback(
    (catId) => {
      const current = [...selectedCategories];
      const idx = current.indexOf(catId);
      if (idx >= 0) current.splice(idx, 1);
      else current.push(catId);
      if (onFilterChange) onFilterChange({ ...filters, categories: current });
    },
    [selectedCategories, filters, onFilterChange]
  );

  const handleMinPrice = useCallback(
    (val) => {
      if (onFilterChange) onFilterChange({ ...filters, minPrice: val });
    },
    [filters, onFilterChange]
  );

  const handleMaxPrice = useCallback(
    (val) => {
      if (onFilterChange) onFilterChange({ ...filters, maxPrice: val });
    },
    [filters, onFilterChange]
  );

  const handleInStock = useCallback(
    (val) => {
      if (onFilterChange) onFilterChange({ ...filters, inStock: val || undefined });
    },
    [filters, onFilterChange]
  );

  const handleClearAll = useCallback(() => {
    if (onClearFilters) onClearFilters();
  }, [onClearFilters]);

  const inner = (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-primary-200 px-5 py-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-primary-900" />
          <h2 className="font-display text-lg font-semibold text-primary-900">
            Filtros
          </h2>
          {activeCount > 0 && (
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-accent-gold px-2 text-xs font-bold text-primary-900">
              {activeCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-primary-600 transition-colors duration-200 hover:bg-primary-200 hover:text-primary-900"
            >
              <RotateCcw size={14} />
              Limpiar
            </button>
          )}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-primary-300 text-primary-900 transition-colors duration-300 hover:border-accent-gold hover:text-accent-gold lg:hidden"
              aria-label="Cerrar filtros"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="space-y-6">
          {/* ORDENAR */}
          <section>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-primary-600 mb-3">
              Ordenar por
            </h3>
            <select
              value={sortBy}
              onChange={(e) => onSortChange && onSortChange(e.target.value)}
              className="h-11 w-full rounded-xl border border-primary-300 bg-white px-4 text-sm text-primary-900 outline-none transition-all duration-200 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/30"
              aria-label="Ordenar productos"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </section>

          {/* CATEGORÍA */}
          <section>
            <button
              type="button"
              onClick={() => setShowCategoryFilter((prev) => !prev)}
              className="flex w-full items-center justify-between group"
            >
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-primary-600">
                Categoría
              </h3>
              <ChevronDown
                size={16}
                className={`text-primary-400 transition-transform duration-200 ${
                  showCategoryFilter ? 'rotate-0' : '-rotate-90'
                }`}
              />
            </button>

            {showCategoryFilter && (
              <div className="mt-3 space-y-1.5">
                {CATEGORIES.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-primary-200/70"
                  >
                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                        selectedCategories.includes(cat.id)
                          ? 'border-accent-gold bg-accent-gold text-primary-900'
                          : 'border-primary-300 bg-white'
                      }`}
                    >
                      {selectedCategories.includes(cat.id) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3"
                          aria-hidden="true"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => toggleCategory(cat.id)}
                      className="sr-only"
                      aria-label={`Filtrar por ${cat.label}`}
                    />
                    <span className="text-sm font-medium text-primary-900">
                      {cat.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </section>

          {/* PRECIO */}
          <section>
            <button
              type="button"
              onClick={() => setShowPriceFilter((prev) => !prev)}
              className="flex w-full items-center justify-between group"
            >
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-primary-600">
                Rango de Precio
              </h3>
              <ChevronDown
                size={16}
                className={`text-primary-400 transition-transform duration-200 ${
                  showPriceFilter ? 'rotate-0' : '-rotate-90'
                }`}
              />
            </button>

            {showPriceFilter && (
              <div className="mt-3 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label
                      htmlFor="filter-min-price"
                      className="block text-xs font-medium text-primary-600 mb-1"
                    >
                      Desde
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-primary-400">
                        $
                      </span>
                      <input
                        id="filter-min-price"
                        type="number"
                        min="0"
                        value={minPrice}
                        onChange={(e) => handleMinPrice(e.target.value)}
                        placeholder="0"
                        className="h-10 w-full rounded-xl border border-primary-300 bg-white pl-7 pr-3 text-sm text-primary-900 placeholder:text-primary-400 outline-none transition-all duration-200 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/30"
                        aria-label="Precio mínimo"
                      />
                    </div>
                  </div>

                  <span className="mt-5 text-sm text-primary-400">—</span>

                  <div className="flex-1">
                    <label
                      htmlFor="filter-max-price"
                      className="block text-xs font-medium text-primary-600 mb-1"
                    >
                      Hasta
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-primary-400">
                        $
                      </span>
                      <input
                        id="filter-max-price"
                        type="number"
                        min="0"
                        value={maxPrice}
                        onChange={(e) => handleMaxPrice(e.target.value)}
                        placeholder="999,999"
                        className="h-10 w-full rounded-xl border border-primary-300 bg-white pl-7 pr-3 text-sm text-primary-900 placeholder:text-primary-400 outline-none transition-all duration-200 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/30"
                        aria-label="Precio máximo"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* DISPONIBILIDAD */}
          <section>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-primary-600 mb-3">
              Disponibilidad
            </h3>
            <label className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-primary-200/70">
              <span className="text-sm font-medium text-primary-900">
                Solo productos disponibles
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={!!inStock}
                onClick={() => handleInStock(inStock ? undefined : true)}
                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 ${
                  inStock ? 'bg-accent-gold' : 'bg-primary-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    inStock ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </label>
          </section>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden w-full max-w-xs shrink-0 lg:block">
        <div className="flex h-full flex-col rounded-2xl border border-primary-200 bg-primary-100">
          {inner}
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="fixed inset-0 z-drawer flex lg:hidden" role="presentation">
          <div
            className="absolute inset-0 bg-primary-900/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filtros"
            className="relative ml-auto flex w-full max-w-sm flex-col bg-primary-100 shadow-elegant-xl animate-slide-in-right"
          >
            {inner}
          </div>
        </div>
      )}
    </>
  );
}

export default FilterSidebar;
