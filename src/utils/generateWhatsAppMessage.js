import { WHATSAPP_MESSAGE_PREFIX } from './constants';
import { formatPriceSimple } from './formatPrice';

export function generateWhatsAppMessage({ items, subtotal, customer } = {}) {
  let message = WHATSAPP_MESSAGE_PREFIX;

  message += '\n\n';
  message += '━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━\n';
  message += ' 🛍️  MI PEDIDO\n';
  message += '━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━\n\n';

  if (items && items.length > 0) {
    items.forEach((item, idx) => {
      const name = item.name || item.nombre || 'Producto';
      const qty = item.quantity || 1;
      const price = item.price || item.precio || 0;
      const subtotalItem = price * qty;

      message += `${idx + 1}. ${name}\n`;
      message += `   Cantidad: ${qty}\n`;

      if (item.variants && Object.keys(item.variants).length > 0) {
        Object.entries(item.variants).forEach(([key, value]) => {
          message += `   ${key}: ${value}\n`;
        });
      }

      message += `   Precio unitario: ${formatPriceSimple(price)}\n`;
      message += `   Subtotal: ${formatPriceSimple(subtotalItem)}\n\n`;
    });
  }

  message += '━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━\n';

  if (subtotal !== undefined) {
    message += `\n💰 TOTAL: ${formatPriceSimple(subtotal)}\n`;
  }

  message += '\n━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━\n';
  message += ' 📋  DATOS DEL CLIENTE\n';
  message += '━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━\n\n';

  message += '👤 Nombre: _________________\n';
  message += '📍 Ciudad: _________________\n';
  message += '📦 Dirección: _______________\n';
  message += '📞 Teléfono: ________________\n';

  if (customer?.nombre) {
    message = message.replace(
      '👤 Nombre: _________________',
      `👤 Nombre: ${customer.nombre}`
    );
  }
  if (customer?.ciudad) {
    message = message.replace(
      '📍 Ciudad: _________________',
      `📍 Ciudad: ${customer.ciudad}`
    );
  }
  if (customer?.direccion) {
    message = message.replace(
      '📦 Dirección: _______________',
      `📦 Dirección: ${customer.direccion}`
    );
  }
  if (customer?.telefono) {
    message = message.replace(
      '📞 Teléfono: ________________',
      `📞 Teléfono: ${customer.telefono}`
    );
  }

  message += '\n\n✨ Gracias por apoyar el arte artesanal colombiano. ✨';
  message += '\n🙏 ETHNIKA BY COL';

  return message;
}

export function generateWhatsAppMessageForUser(user) {
  let message = 'Hola ETHNIKA BY COL,\n\n';
  message += 'Mi información de contacto:\n';
  message += `Nombre: ${user.nombre}\n`;
  message += `Email: ${user.email}\n`;
  message += `Teléfono: ${user.telefono}\n\n`;
  message += 'Me gustaría obtener más información sobre sus productos.';
  
  return message;
}

export function generateWhatsAppUrl(phoneNumber, message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encoded}`;
}
