const { generateHash } = require('../main.js');

describe('generateHash', () => {
  test('should return a SHA-256 hash in hexadecimal format', () => {
    const input = 'Hello, World!';
    const hash = generateHash(input);
    expect(typeof hash).toBe('string');
    expect(hash.length).toBe(64); // SHA-256 produces 64 hex characters
    expect(/^[0-9a-f]+$/.test(hash)).toBe(true);
  });

  test('should produce the same hash for the same input', () => {
    const input = 'test';
    const hash1 = generateHash(input);
    const hash2 = generateHash(input);
    expect(hash1).toBe(hash2);
  });

  test('should produce different hashes for different inputs', () => {
    const hash1 = generateHash('abc');
    const hash2 = generateHash('abcd');
    expect(hash1).not.toBe(hash2);
  });

  test('should handle empty string', () => {
    const hash = generateHash('');
    expect(typeof hash).toBe('string');
    expect(hash.length).toBe(64);
  });
});