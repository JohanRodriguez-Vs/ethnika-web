const STORAGE_PREFIX = 'ethnika_';

function getKey(key) {
  return key.startsWith(STORAGE_PREFIX) ? key : `${STORAGE_PREFIX}${key}`;
}

export const storageService = {
  get(key) {
    try {
      const item = localStorage.getItem(getKey(key));
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(getKey(key), JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(getKey(key));
      return true;
    } catch {
      return false;
    }
  },

  clear() {
    try {
      const keys = Object.keys(localStorage).filter((k) =>
        k.startsWith(STORAGE_PREFIX)
      );
      keys.forEach((k) => localStorage.removeItem(k));
      return true;
    } catch {
      return false;
    }
  },

  exists(key) {
    try {
      return localStorage.getItem(getKey(key)) !== null;
    } catch {
      return false;
    }
  },
};
