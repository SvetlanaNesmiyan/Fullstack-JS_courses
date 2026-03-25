const { compressFile } = require('../main.js')
const fs = require('fs')
const { createReadStream, existsSync } = fs
const { resolve } = require('path')
const { tmpdir } = require('os')
const { join } = require('path')

let testDir

beforeEach(() => {
  testDir = fs.mkdtempSync(join(tmpdir(), 'compress-test-')
  fs.writeFileSync(join(testDir, 'source.txt'), 'This is a test file content')
})

afterEach(() => {
  fs.rmSync(testDir, { recursive: true, force: true })
  jest.restoreAllMocks()
})

test('should compress a file and return the path to the compressed file', async () => {
  const filePath = join(testDir, 'source.txt')
  const expectedCompressedPath = join(testDir, 'source.txt.gz')
  await expect(compressFile(filePath)).resolves.toBe(expectedCompressedPath)
  expect(existsSync(expectedCompressedPath)).toBeTruthy()
})

test('should handle existing compressed files by creating a unique filename', async () => {
  const filePath = join(testDir, 'source.txt')
  fs.writeFileSync(join(testDir, 'source.txt.gz'), '')
  const expectedNewCompressedPath = join(testDir, 'source_1.txt.gz')
  await expect(compressFile(filePath)).resolves.toBe(expectedNewCompressedPath)
  expect(existsSync(expectedNewCompressedPath)).toBeTruthy()
})

it('should handle file compression errors', async () => {
  const failingFilePath = join(testDir, 'nonexistent.txt')
  await expect(compressFile(failingFilePath)).rejects.toThrow(`file "${failingFilePath}" does not exist`)
})