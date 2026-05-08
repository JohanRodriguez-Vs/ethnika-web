import { WHATSAPP_NUMBER } from '../utils/constants';
import { generateWhatsAppMessage, generateWhatsAppUrl } from '../utils/generateWhatsAppMessage';

export function sendWhatsAppOrder({ items, subtotal, customer } = {}) {
  const message = generateWhatsAppMessage({ items, subtotal, customer });
  const url = generateWhatsAppUrl(WHATSAPP_NUMBER, message);
  window.open(url, '_blank', 'noopener,noreferrer');
  return url;
}

export function getWhatsAppUrl({ items, subtotal, customer } = {}) {
  const message = generateWhatsAppMessage({ items, subtotal, customer });
  return generateWhatsAppUrl(WHATSAPP_NUMBER, message);
}

export function getWhatsAppContactUrl() {
  return `https://wa.me/${WHATSAPP_NUMBER}`;
}
