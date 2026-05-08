import { forwardRef } from 'react';

const VARIANT_STYLES = {
  primary:
    'bg-primary-900 text-primary-100 shadow-elegant hover:-translate-y-0.5 hover:bg-accent-gold hover:text-primary-900 hover:shadow-gold',
  secondary:
    'border border-primary-900 bg-transparent text-primary-900 hover:border-accent-gold hover:bg-accent-gold/10',
  ghost:
    'bg-transparent text-primary-900 hover:bg-primary-200/70',
};

const SIZE_STYLES = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

const WIDTH_STYLES = {
  auto: 'w-auto',
  full: 'w-full',
};

function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    />
  );
}

const Button = forwardRef(function Button(
  {
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    width = 'auto',
    loading = false,
    disabled = false,
    className = '',
    leftIcon = null,
    rightIcon = null,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;

  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary-100 disabled:cursor-not-allowed disabled:opacity-60',
    VARIANT_STYLES[variant] || VARIANT_STYLES.primary,
    SIZE_STYLES[size] || SIZE_STYLES.md,
    WIDTH_STYLES[width] || WIDTH_STYLES.auto,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <Spinner />
          <span>Cargando...</span>
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
});

export default Button;
