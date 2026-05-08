function Loader({
  label = 'Cargando...',
  fullScreen = false,
  size = 'md',
  className = '',
}) {
  const sizeClass =
    size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-14 w-14' : 'h-10 w-10';

  const wrapperClass = fullScreen
    ? 'fixed inset-0 z-notification flex items-center justify-center bg-primary-100/90 backdrop-blur-sm'
    : 'flex items-center justify-center py-10';

  return (
    <div
      className={`${wrapperClass} ${className}`.trim()}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className={`relative ${sizeClass} animate-spin rounded-full border-4 border-primary-300 border-t-accent-gold`}
          aria-hidden="true"
        />
        {label ? (
          <p className="text-sm font-medium tracking-wide text-primary-800">
            {label}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default Loader;
