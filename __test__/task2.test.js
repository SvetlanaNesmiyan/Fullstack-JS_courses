const { decompressFile } = require('../main')
const fs = require('fs')
const { join } = require('path')
const { tmpdir } = require('os')
const zlib = require('zlib')

describe('decompressFile function', () => {
  let testDir
  let originalFilePath
  let compressedFilePath
  let destinationFilePath

  beforeEach(() => {
    testDir = fs.mkdtempSync(join(tmpdir(), 'decompress-test-'))
    originalFilePath = join(testDir, 'source.txt')
    compressedFilePath = join(testDir, 'source.txt.gz')
    destinationFilePath = join(testDir, 'source_decompressed.txt')

    const originalContent = 'This is the original content of the file'
    fs.writeFileSync(originalFilePath, originalContent)
    const compressedContent = zlib.gzipSync(originalContent)
    fs.writeFileSync(compressedFilePath, compressedContent)
  })

  afterEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true })
    jest.restoreAllMocks()
  })

  test('should create a decompressed file and match the original content', async () => {
    await decompressFile(compressedFilePath, destinationFilePath)
    const fileExists = fs.existsSync(destinationFilePath)
    expect(fileExists).toBe(true)

    const decompressedContent = fs.readFileSync(destinationFilePath, 'utf8')
    const originalFileContent = fs.readFileSync(originalFilePath, 'utf8')
    expect(decompressedContent).toEqual(originalFileContent)
  })

  test('should handle read errors gracefully', async () => {
    const nonExistentPath = join(testDir, 'nonexistent.gz')
    await expect(decompressFile(nonExistentPath, destinationFilePath)).rejects.toThrow()
  })
})