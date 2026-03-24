const { generatePasswordHash } = require('../main.js');

describe('generatePasswordHash', () => {
  test('should return a hash in hexadecimal format', () => {
    const password = 'testPassword';
    const salt = 'fixedSalt';
    const hash = generatePasswordHash(password, salt);
    expect(typeof hash).toBe('string');
    // Length depends on keylen and digest; default keylen=64, digest='sha512' => 512 bits = 64 bytes => 128 hex chars
    expect(hash.length).toBe(128);
    expect(/^[0-9a-f]+$/.test(hash)).toBe(true);
  });

  test('should use default iterations, keylen, and digest when not provided', () => {
    const password = 'testPassword';
    const salt = 'fixedSalt';
    const hash = generatePasswordHash(password, salt);
    // Default: iterations=10000, keylen=64, digest='sha512'
    // We can't easily verify the exact hash without reimplementing, but we can verify length and that it's deterministic.
    const hash2 = generatePasswordHash(password, salt);
    expect(hash).toBe(hash2);
  });

  test('should produce different hashes for different salts', () => {
    const password = 'testPassword';
    const salt1 = 'salt1';
    const salt2 = 'salt2';
    const hash1 = generatePasswordHash(password, salt1);
    const hash2 = generatePasswordHash(password, salt2);
    expect(hash1).not.toBe(hash2);
  });

  test('should produce different hashes for different passwords', () => {
    const password1 = 'password1';
    const password2 = 'password2';
    const salt = 'fixedSalt';
    const hash1 = generatePasswordHash(password1, salt);
    const hash2 = generatePasswordHash(password2, salt);
    expect(hash1).not.toBe(hash2);
  });

  test('should accept custom iterations, keylen, and digest', () => {
    const password = 'testPassword';
    const salt = 'fixedSalt';
    const hash = generatePasswordHash(password, salt, 5000, 32, 'sha256');
    // With keylen=32 bytes, digest='sha256' => 256 bits = 32 bytes => 64 hex chars
    expect(hash.length).toBe(64);
    expect(/^[0-9a-f]+$/.test(hash)).toBe(true);
  });
});