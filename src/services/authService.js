import usuarios from '../data/usuarios.json';
import { storageService } from './storageService';

const SESSION_KEY = 'ethnika_user';

export const authService = {
  login(email, password) {
    const user = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return { success: false, error: 'Credenciales inválidas' };
    }

    const session = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      telefono: user.telefono,
    };

    storageService.set(SESSION_KEY, session);
    return { success: true, user: session };
  },

  register(data) {
    const exists = usuarios.some((u) => u.email === data.email);
    if (exists) {
      return { success: false, error: 'El correo ya está registrado' };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      nombre: data.nombre,
      email: data.email,
      password: data.password,
      role: 'user',
      avatar: data.avatar || '',
      telefono: data.telefono || '',
      fechaRegistro: new Date().toISOString().slice(0, 10),
    };

    usuarios.push(newUser);

    const session = {
      id: newUser.id,
      nombre: newUser.nombre,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar,
      telefono: newUser.telefono,
    };

    storageService.set(SESSION_KEY, session);
    return { success: true, user: session };
  },

  logout() {
    storageService.remove(SESSION_KEY);
  },

  getSession() {
    return storageService.get(SESSION_KEY);
  },

  isAuthenticated() {
    return !!storageService.get(SESSION_KEY);
  },

  isAdmin() {
    const session = storageService.get(SESSION_KEY);
    return session?.role === 'admin';
  },
};
