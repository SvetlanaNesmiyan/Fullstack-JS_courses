console.log('#54. JavaScript homework file');

/*
 * #1
 */

import { writeFile } from 'fs/promises';

async function writeFileAsync(filename, content) {
  try {
    await writeFile(filename, content);
    console.log('Файл успішно записано');
  } catch (error) {
    console.error('Помилка при записі файлу:', error);
  }
}

/*
 * #2
 */

import { readFile } from 'fs/promises';

async function readFileAsync(filename) {
  try {
    const content = await readFile(filename, 'utf8');
    console.log('Файл успішно прочитано:', content);
    return content;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('Файл не існує:', filename);
    } else {
      console.error('Помилка при читанні файлу:', error);
    }
    throw error;
  }
}

/*
 * #3
 */

import { unlink } from 'fs/promises';

async function deleteFileAsync(filename) {
  try {
    await unlink(filename);
    console.log('Файл успішно видалено');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('Файл не існує:', filename);
    } else {
      console.error('Помилка при видаленні файлу:', error);
    }
    throw error;
  }
}


export { writeFileAsync, readFileAsync, deleteFileAsync };
