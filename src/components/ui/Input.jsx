import { forwardRef, useId } from 'react';

const SIZE_STYLES = {
  sm: 'h-10 text-sm px-3',
  md: 'h-11 text-sm px-4',
  lg: 'h-12 text-base px-4',
};

const WIDTH_STYLES = {
  auto: 'w-auto',
  full: 'w-full',
};

const STATE_STYLES = {
  default:
    'border-primary-300 bg-white text-primary-900 placeholder:text-gray-500 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/30',
  error:
    'border-red-500 bg-white text-primary-900 placeholder:text-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200',
  success:
    'border-green-600 bg-white text-primary-900 placeholder:text-gray-500 focus:border-green-600 focus:ring-2 focus:ring-green-200',
};

const Input = forwardRef(function Input(
  {
    id,
    name,
    label,
    helperText,
    error,
    success = false,
    leftIcon = null,
    rightIcon = null,
    size = 'md',
    width = 'full',
    className = '',
    containerClassName = '',
    required = false,
    disabled = false,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = id || `${name || 'input'}-${generatedId}`;
  const messageId = `${inputId}-message`;
  const hasError = Boolean(error);
  const state = hasError ? 'error' : success ? 'success' : 'default';

  const inputClasses = [
    'peer block rounded-xl border outline-none transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60',
    SIZE_STYLES[size] || SIZE_STYLES.md,
    WIDTH_STYLES[width] || WIDTH_STYLES.full,
    STATE_STYLES[state],
    leftIcon ? 'pl-10' : '',
    rightIcon ? 'pr-10' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`space-y-1.5 ${containerClassName}`.trim()}>
      {label && (
        <label
          htmlFor={inputId}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary-900"
        >
          <span>{label}</span>
          {required && <span className="text-red-600">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          className={inputClasses}
          aria-invalid={hasError}
          aria-describedby={helperText || error ? messageId : undefined}
          required={required}
          disabled={disabled}
          {...props}
        />

        {rightIcon && (
          <span
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </div>

      {(helperText || error) && (
        <p
          id={messageId}
          className={`text-xs ${
            hasError ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
});

export default Input;
