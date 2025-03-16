import * as crypto from 'crypto';

// Dodaj crypto do globalnego obiektu, jeśli nie istnieje
if (!global.crypto) {
  (global as any).crypto = {
    randomUUID: () =>
      crypto.randomUUID
        ? crypto.randomUUID()
        : crypto.randomBytes(16).toString('hex'),
  };
}
