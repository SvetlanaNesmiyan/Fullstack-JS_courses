const { verifyPassword, generatePasswordHash } = require('../main.js');

describe('verifyPassword', () => {
  test('should return true for correct password', () => {
    const password = 'testPassword';
    const salt = 'fixedSalt';
    const storedHash = generatePasswordHash(password, salt);
    const result = verifyPassword(password, storedHash, salt);
    expect(result).toBe(true);
  });

  test('should return false for incorrect password', () => {
    const password = 'testPassword';
    const wrongPassword = 'wrongPassword';
    const salt = 'fixedSalt';
    const storedHash = generatePasswordHash(password, salt);
    const result = verifyPassword(wrongPassword, storedHash, salt);
    expect(result).toBe(false);
  });

  test('should use default iterations, keylen, and digest when not provided', () => {
    const password = 'testPassword';
    const salt = 'fixedSalt';
    const storedHash = generatePasswordHash(password, salt); // uses defaults
    const result = verifyPassword(password, storedHash, salt); // uses defaults
    expect(result).toBe(true);
  });

  test('should work with custom iterations, keylen, and digest', () => {
    const password = 'testPassword';
    const salt = 'fixedSalt';
    const iterations = 5000;
    const keylen = 32;
    const digest = 'sha256';
    const storedHash = generatePasswordHash(password, salt, iterations, keylen, digest);
    const result = verifyPassword(password, storedHash, salt, iterations, keylen, digest);
    expect(result).toBe(true);
  });

  test('should return false if hash length is incorrect (tampered)', () => {
    const password = 'testPassword';
    const salt = 'fixedSalt';
    const storedHash = generatePasswordHash(password, salt);
    // Tamper with the hash by changing one character
    const tamperedHash = storedHash.slice(0, -1) + '0';
    const result = verifyPassword(password, tamperedHash, salt);
    expect(result).toBe(false);
  });

  test('should handle empty string password', () => {
    const password = '';
    const salt = 'fixedSalt';
    const storedHash = generatePasswordHash(password, salt);
    const result = verifyPassword(password, storedHash, salt);
    expect(result).toBe(true);
  });
});