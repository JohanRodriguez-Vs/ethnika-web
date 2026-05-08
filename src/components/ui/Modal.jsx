import { useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({
  isOpen = false,
  onClose,
  title = '',
  children = null,
  size = 'md',
  closeOnOverlay = true,
  closeOnEsc = true,
  showCloseButton = true,
  footer = null,
}) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !closeOnEsc) return undefined;

    function onKeyDown(event) {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  const sizeClass =
    size === 'sm'
      ? 'max-w-md'
      : size === 'lg'
      ? 'max-w-3xl'
      : size === 'xl'
      ? 'max-w-5xl'
      : 'max-w-xl';

  function handleOverlayClick(event) {
    if (!closeOnOverlay || !onClose) return;
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-modal flex items-center justify-center bg-primary-900/55 px-4 py-6 backdrop-blur-sm"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Modal'}
        className={`w-full ${sizeClass} max-h-[90vh] overflow-hidden rounded-2xl border border-primary-200 bg-primary-100 shadow-elegant-lg anim-scale-in`}
      >
        <header className="flex items-center justify-between border-b border-primary-200 px-5 py-4">
          <h2 className="font-display text-xl font-semibold text-primary-900">
            {title}
          </h2>

          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary-300 text-primary-900 transition-colors duration-300 hover:border-accent-gold hover:text-accent-gold"
              aria-label="Cerrar modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </header>

        <div className="max-h-[calc(90vh-128px)] overflow-y-auto px-5 py-4">
          {children}
        </div>

        {footer && (
          <footer className="border-t border-primary-200 px-5 py-4">
            {footer}
          </footer>
        )}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
