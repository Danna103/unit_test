import { describe, it, expect } from 'vitest';
import { hashPassword, comparePassword } from '../../../src/utils/password.util';

describe('Pruebas para Utilidades de Contraseñas', () => {
  const claveAlpha = 'Segura#987';
  const claveBeta = 'Secreta$321';

  it('Validación de hash: genera cadenas únicas, no vacías y distintas al texto plano', async () => {
    const cipherAlpha = await hashPassword(claveAlpha);
    const cipherBeta = await hashPassword(claveBeta);

    // Comprobaciones de existencia y tipo
    expect(typeof cipherAlpha).toBe('string');
    expect(cipherAlpha.length).toBeGreaterThan(5);
    expect(cipherAlpha).not.toEqual(claveAlpha);

    expect(typeof cipherBeta).toBe('string');
    expect(cipherBeta.length).toBeGreaterThan(5);
    expect(cipherBeta).not.toEqual(claveBeta);

    // Garantizar que ambos hashes difieren entre sí
    expect(cipherAlpha).not.toEqual(cipherBeta);
  });

  it('Coincidencia positiva: comparePassword valida correctamente credenciales válidas', async () => {
    const cipherAlpha = await hashPassword(claveAlpha);
    const cipherBeta = await hashPassword(claveBeta);

    const validacionAlpha = await comparePassword(claveAlpha, cipherAlpha);
    const validacionBeta = await comparePassword(claveBeta, cipherBeta);

    expect(validacionAlpha).toBeTruthy();
    expect(validacionBeta).toBeTruthy();
  });

  it('Coincidencia negativa: comparePassword rechaza credenciales cruzadas o incorrectas', async () => {
    const cipherAlpha = await hashPassword(claveAlpha);
    const cipherBeta = await hashPassword(claveBeta);

    const errorCruzado1 = await comparePassword(claveBeta, cipherAlpha);
    const errorCruzado2 = await comparePassword(claveAlpha, cipherBeta);

    expect(errorCruzado1).toBe(false);
    expect(errorCruzado2).toBe(false);
  });
});