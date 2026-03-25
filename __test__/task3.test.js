const { join } = require('path')
const fs = require('fs')
const { compressFile, decompressFile } = require('../main')

describe('File Content Comparison', () => {
  const baseDir = join(__dirname, '..', 'files')
  const originalFilePath = join(baseDir, 'source.txt')
  const compressedFilePath = join(baseDir, 'source.txt.gz')
  const decompressedFilePath = join(baseDir, 'source_decompressed.txt')

  beforeEach(async () => {
    await compressFile(originalFilePath)
    await decompressFile(compressedFilePath, decompressedFilePath)
  })

  test('original and decompressed files should have the same content', () => {
    const originalContent = fs.readFileSync(originalFilePath, 'utf8')
    const decompressedContent = fs.readFileSync(decompressedFilePath, 'utf8')

    expect(decompressedContent).toEqual(originalContent)
  })
})