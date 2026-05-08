import { useEffect, useState } from 'react';

const TOAST_STYLES = {
  success: 'border-green-600/30 bg-green-50 text-green-900',
  error: 'border-red-600/30 bg-red-50 text-red-900',
  warning: 'border-amber-600/30 bg-amber-50 text-amber-900',
  info: 'border-blue-600/30 bg-blue-50 text-blue-900',
};

const TOAST_ICON = {
  success: '✓',
  error: '✕',
  warning: '!',
  info: 'i',
};

function Toast({
  open = false,
  message = '',
  type = 'info',
  duration = 3500,
  position = 'top-right',
  onClose = null,
}) {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  useEffect(() => {
    if (!visible || !duration || duration <= 0) return undefined;

    const timeout = window.setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => window.clearTimeout(timeout);
  }, [visible, duration, onClose]);

  if (!visible || !message) return null;

  const positionClass =
    position === 'top-left'
      ? 'top-5 left-5'
      : position === 'bottom-left'
      ? 'bottom-5 left-5'
      : position === 'bottom-right'
      ? 'bottom-5 right-5'
      : 'top-5 right-5';

  const styleClass = TOAST_STYLES[type] || TOAST_STYLES.info;
  const icon = TOAST_ICON[type] || TOAST_ICON.info;

  function handleClose() {
    setVisible(false);
    if (onClose) onClose();
  }

  return (
    <div
      className={`fixed ${positionClass} z-notification w-[calc(100%-2.5rem)] max-w-sm anim-slide-down`}
      role="status"
      aria-live="polite"
    >
      <div
        className={`flex items-start gap-3 rounded-xl border px-4 py-3 shadow-elegant ${styleClass}`}
      >
        <span
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current/30 text-xs font-bold"
          aria-hidden="true"
        >
          {icon}
        </span>

        <p className="flex-1 text-sm font-medium leading-relaxed">{message}</p>

        <button
          type="button"
          onClick={handleClose}
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors duration-200 hover:bg-black/10"
          aria-label="Cerrar notificacion"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Toast;
