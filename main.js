// Imports
const { createGzip, createGunzip } = require('zlib');
const { createReadStream, createWriteStream } = require('fs');
const { access } = require('fs/promises');
const { constants } = require('fs');
const { join, dirname, extname, basename } = require('path');
const { pipeline } = require('stream/promises');

async function compressFile(filePath) {
    try {
        await access(filePath, constants.R_OK);

        const dir = dirname(filePath);
        const ext = extname(filePath);
        const name = basename(filePath, ext);

        let counter = 0;
        let compressedFilePath;
        while (true) {
            const suffix = counter === 0 ? '' : `_${counter}`;
            compressedFilePath = join(dir, `${name}${suffix}${ext}.gz`);
            try {
                await access(compressedFilePath, constants.F_OK);
            } catch (err) {
                if (err.code === 'ENOENT') {
                    break;
                }
                throw err;
            }
            counter++;
        }

        await pipeline(
            createReadStream(filePath),
            createGzip(),
            createWriteStream(compressedFilePath)
        );

        return compressedFilePath;
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error(`file "${filePath}" does not exist`);
        }
        throw err;
    }
}

async function decompressFile(compressedFilePath, destinationFilePath) {
    try {
        await access(compressedFilePath, constants.R_OK);
        const dir = dirname(destinationFilePath);
        const ext = extname(destinationFilePath);
        const name = basename(destinationFilePath, ext);

        let counter = 0;
        let uniqueDestinationFilePath;
        while (true) {
            const suffix = counter === 0 ? '' : `_${counter}`;
            uniqueDestinationFilePath = join(dir, `${name}${suffix}${ext}`);
            try {
                await access(uniqueDestinationFilePath, constants.F_OK);
            } catch (err) {
                if (err.code === 'ENOENT') {
                    break;
                }
                throw err;
            }
            counter++;
        }

        await pipeline(
            createReadStream(compressedFilePath),
            createGunzip(),
            createWriteStream(uniqueDestinationFilePath)
        );

        return uniqueDestinationFilePath;
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error(`file "${compressedFilePath}" does not exist`);
        }
        throw err;
    }
}

module.exports = { compressFile, decompressFile };

// ! Перевірка роботи функцій стиснення та розпакування файлів
// async function performCompressionAndDecompression() {
//   try {
//     const compressedResult = await compressFile('./files/source.txt')
//     console.log(compressedResult)
//     const decompressedResult = await decompressFile(compressedResult, './files/source_decompressed.txt')
//     console.log(decompressedResult)
//   } catch (error) {
//     console.error('Error during compression or decompression:', error)
//   }
// }
// performCompressionAndDecompression()
