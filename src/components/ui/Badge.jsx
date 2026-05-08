const COLOR_MAP = {
  default: {
    solid: 'bg-primary-900 text-primary-100 border-primary-900',
    soft: 'bg-primary-200 text-primary-900 border-primary-300',
    outline: 'bg-transparent text-primary-900 border-primary-400',
  },
  gold: {
    solid: 'bg-accent-gold text-primary-900 border-accent-gold',
    soft: 'bg-accent-gold/15 text-primary-900 border-accent-gold/40',
    outline: 'bg-transparent text-accent-gold border-accent-gold',
  },
  success: {
    solid: 'bg-green-600 text-white border-green-600',
    soft: 'bg-green-100 text-green-800 border-green-300',
    outline: 'bg-transparent text-green-700 border-green-600',
  },
  warning: {
    solid: 'bg-amber-500 text-amber-950 border-amber-500',
    soft: 'bg-amber-100 text-amber-900 border-amber-300',
    outline: 'bg-transparent text-amber-700 border-amber-600',
  },
  error: {
    solid: 'bg-red-600 text-white border-red-600',
    soft: 'bg-red-100 text-red-800 border-red-300',
    outline: 'bg-transparent text-red-700 border-red-600',
  },
  info: {
    solid: 'bg-blue-600 text-white border-blue-600',
    soft: 'bg-blue-100 text-blue-800 border-blue-300',
    outline: 'bg-transparent text-blue-700 border-blue-600',
  },
};

const SIZE_MAP = {
  sm: 'h-5 px-2 text-[10px]',
  md: 'h-6 px-2.5 text-xs',
  lg: 'h-7 px-3 text-sm',
};

function Badge({
  children,
  variant = 'default',
  tone = 'soft',
  size = 'md',
  rounded = 'full',
  className = '',
  dot = false,
}) {
  const palette = COLOR_MAP[variant] || COLOR_MAP.default;
  const toneClass = palette[tone] || palette.soft;
  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;
  const roundedClass = rounded === 'md' ? 'rounded-md' : 'rounded-full';

  const classes = [
    'inline-flex items-center gap-1.5 border font-semibold uppercase tracking-wide',
    roundedClass,
    sizeClass,
    toneClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" aria-hidden="true" />}
      <span>{children}</span>
    </span>
  );
}

export default Badge;
