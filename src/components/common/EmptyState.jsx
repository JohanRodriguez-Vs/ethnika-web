function EmptyState({
  icon,
  title = 'Sin contenido',
  description = 'No hay elementos disponibles en este momento.',
  action,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center px-6 py-12 text-center ${className}`}>
      {icon && (
        <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F3EF] text-[#C6A75E]">
          {icon}
        </div>
      )}

      <h3 className="font-playfair text-xl font-semibold text-[#1A1A1A]">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#999999]">
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export default EmptyState;
