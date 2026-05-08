export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return /^\+?\d{7,15}$/.test(cleaned);
}

export function validatePhone(phone) {
  return isValidPhone(phone);
}

export function isValidPassword(password) {
  if (!password || typeof password !== 'string') return false;
  if (password.length < 6) return { valid: false, error: 'Mínimo 6 caracteres' };
  if (!/[A-Z]/.test(password)) return { valid: false, error: 'Debe contener una mayúscula' };
  if (!/[0-9]/.test(password)) return { valid: false, error: 'Debe contener un número' };
  return { valid: true, error: null };
}

export function isRequired(value, fieldName = 'Este campo') {
  if (value === undefined || value === null || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} es requerido`;
  }
  return null;
}

export function isPositiveNumber(value, fieldName = 'El valor') {
  const num = Number(value);
  if (isNaN(num) || num <= 0) {
    return `${fieldName} debe ser un número positivo`;
  }
  return null;
}

export function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validateProductForm(data = {}) {
  const errors = {};

  const nameErr = isRequired(data.nombre || data.name, 'El nombre');
  if (nameErr) errors.nombre = nameErr;

  const priceErr = isPositiveNumber(data.precio ?? data.price, 'El precio');
  if (priceErr) errors.precio = priceErr;

  const catErr = isRequired(data.categoria, 'La categoría');
  if (catErr) errors.categoria = catErr;

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateLoginForm(email, password) {
  const errors = {};

  if (!isValidEmail(email)) errors.email = 'Correo electrónico inválido';
  if (!password || password.length < 1) errors.password = 'La contraseña es requerida';

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateRegisterForm(data = {}) {
  const errors = {};

  const nameErr = isRequired(data.nombre || data.name, 'El nombre');
  if (nameErr) errors.nombre = nameErr;

  if (!isValidEmail(data.email)) errors.email = 'Correo electrónico inválido';

  const pwResult = isValidPassword(data.password);
  if (!pwResult.valid) errors.password = pwResult.error;

  if (data.confirmPassword && data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateEmail(email) {
  return isValidEmail(email);
}

export function validatePassword(password) {
  if (!password || typeof password !== 'string') return false;
  return password.length >= 6;
}
