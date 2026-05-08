import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { getWhatsAppUrl } from '../services/whatsappService';
import { formatPrice } from '../utils/formatPrice';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ScrollReveal from '../components/ui/ScrollReveal';

function Carrito() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();

  const totals = useMemo(() => {
    const shipping = subtotal >= 300000 || subtotal === 0 ? 0 : 18000;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }, [subtotal]);

  const whatsappUrl = useMemo(() => {
    return getWhatsAppUrl({ items, subtotal });
  }, [items, subtotal]);

  return (
    <div className="ethnika-page">
      <section className="section-ethnika">
        <div className="container-ethnika">
          <ScrollReveal direction="up" className="mb-8">
            <h1 className="heading-section md:text-5xl">Carrito de compra</h1>
            <p className="mt-3 max-w-2xl text-lead">
              Revisa tus productos seleccionados y genera tu pedido para
              finalizarlo por WhatsApp con un asesor.
            </p>
          </ScrollReveal>

          {items.length === 0 ? (
            <ScrollReveal direction="up" className="card-ethnika p-8 text-center">
              <h2 className="font-display text-3xl font-semibold text-primary-900">
                Tu carrito esta vacio
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-gray-700">
                Explora nuestra tienda y agrega artesanias con historia cultural
                para comenzar tu pedido.
              </p>
              <div className="mt-5">
                <Link to="/tienda">
                  <Button>Ir a tienda</Button>
                </Link>
              </div>
            </ScrollReveal>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
              <div className="space-y-4">
                {items.map((item, index) => (
                  <ScrollReveal
                    key={`${item.id}-${JSON.stringify(item.variants)}`}
                    direction="up"
                    delay={index * 70}
                    className="card-ethnika p-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-display text-2xl font-semibold text-primary-900">
                            {item.name}
                          </h2>
                          {item.variants && Object.keys(item.variants).length > 0 && (
                            <Badge variant="default" tone="soft">
                              {Object.values(item.variants).join(' / ')}
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-gray-700">
                          Precio unitario: {formatPrice(item.price)}
                        </p>
                        <p className="font-semibold text-primary-900">
                          Subtotal: {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-300 transition-colors duration-200 hover:border-accent-gold"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="min-w-[2ch] text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-300 transition-colors duration-200 hover:border-accent-gold"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>

                        <button
                          type="button"
                          className="ml-2 inline-flex rounded-lg border border-red-300 px-3 py-2 text-xs font-semibold text-red-700 transition-colors duration-200 hover:bg-red-50"
                          onClick={() => removeItem(item.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal direction="left" className="card-ethnika h-fit p-5">
                <h2 className="font-display text-2xl font-semibold text-primary-900">
                  Resumen del pedido
                </h2>

                <div className="mt-4 space-y-3 text-sm text-gray-700">
                  <div className="flex items-center justify-between">
                    <span>Productos</span>
                    <span>{items.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(totals.subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Envio estimado</span>
                    <span>
                      {totals.shipping === 0
                        ? 'Gratis'
                        : formatPrice(totals.shipping)}
                    </span>
                  </div>
                  <div className="h-px bg-primary-200" />
                  <div className="flex items-center justify-between font-display text-2xl font-bold text-primary-900">
                    <span>Total</span>
                    <span>{formatPrice(totals.total)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    <Button width="full" size="lg">
                      Finalizar por WhatsApp
                    </Button>
                  </a>
                  <Button
                    width="full"
                    size="lg"
                    variant="secondary"
                    onClick={clearCart}
                  >
                    Vaciar carrito
                  </Button>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-gray-600">
                  Al finalizar, se abrira WhatsApp con un mensaje estructurado
                  para que puedas confirmar disponibilidad, envio y pago.
                </p>
              </ScrollReveal>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Carrito;
