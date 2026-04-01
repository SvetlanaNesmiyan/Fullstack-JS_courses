/**
 * MongoDB Shell Operations - Student Assignments
 * Виконання завдань з MongoDB: операції з документами, агрегації, індекси
 */

import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'studentDB';

async function main() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log('✅ Підключено до MongoDB\n');

    const db = client.db(DB_NAME);
    const assignments = db.collection('Assignments');

    // ============================================
    // ЗАВДАННЯ 1: Операції з базами даних і документами
    // ============================================
    console.log('='.repeat(60));
    console.log('ЗАВДАННЯ 1: Операції з базами даних і документами');
    console.log('='.repeat(60));

    // Очищення колекції перед початком
    await assignments.deleteMany({});
    console.log('🗑️ Колекцію очищено');

    // 1.1 Створення бази даних studentDB (MongoDB створює БД при першому використанні)
    console.log(`\n📊 База даних: ${DB_NAME}`);

    // 1.2 Створення колекції assignments (MongoDB створює колекцію автоматично)
    console.log('📁 Колекція: Assignments');

    // 1.3 Додавання п'яти документів
    const documents = [
      { name: 'Олександр', subject: 'Математика', score: 92 },
      { name: 'Марія', subject: 'Фізика', score: 78 },
      { name: 'Андрій', subject: 'Математика', score: 85 },
      { name: 'Соломія', subject: 'Хімія', score: 88 },
      { name: 'Тарас', subject: 'Фізика', score: 71 }
    ];

    await assignments.insertMany(documents);
    console.log('✅ Додано 5 документів:');
    documents.forEach((doc, i) => {
      console.log(`   ${i + 1}. ${doc.name} - ${doc.subject}: ${doc.score} балів`);
    });

    // 1.4 Пошук документів, де score > 80
    console.log('\n📋 Запит: score > 80');
    const highScorers = await assignments.find({ score: { $gt: 80 } }).toArray();
    console.log('   Результат:');
    highScorers.forEach(doc => {
      console.log(`   - ${doc.name}: ${doc.score} балів (${doc.subject})`);
    });

    // 1.5 Оновлення документа - збільшення score на 5 для студента з score < 85
    console.log('\n✏️ Оновлення: збільшити score на 5 для студента з score < 85');
    const studentToUpdate = await assignments.findOne({ score: { $lt: 85 } });
    if (studentToUpdate) {
      await assignments.updateOne(
        { _id: studentToUpdate._id },
        { $inc: { score: 5 } }
      );
      const updated = await assignments.findOne({ _id: studentToUpdate._id });
      console.log(`   ${studentToUpdate.name}: ${studentToUpdate.score} → ${updated.score} балів`);
    }

    // 1.6 Видалення документа студента з найнижчим балом
    console.log('\n🗑️ Видалення: студент з найнижчим балом');
    const lowestScorer = await assignments.find().sort({ score: 1 }).limit(1).toArray();
    if (lowestScorer.length > 0) {
      await assignments.deleteOne({ _id: lowestScorer[0]._id });
      console.log(`   Видалено: ${lowestScorer[0].name} (${lowestScorer[0].score} балів)`);
    }

    // 1.7 Проекція - вивести тільки ім'я та бал
    console.log('\n🔍 Проекція: тільки name та score');
    const projection = await assignments.find({}, { projection: { name: 1, score: 1, _id: 0 } }).toArray();
    projection.forEach(doc => {
      console.log(`   - Ім'я: ${doc.name}, Бал: ${doc.score}`);
    });

    // ============================================
    // ЗАВДАННЯ 2: Агрегаційні операції
    // ============================================
    console.log('\n' + '='.repeat(60));
    console.log('ЗАВДАННЯ 2: Агрегаційні операції');
    console.log('='.repeat(60));

    // 2.1 Групування за предметом та обчислення середнього балу
    console.log('\n📊 Середній бал за предметом:');
    const avgBySubject = await assignments.aggregate([
      {
        $group: {
          _id: '$subject',
          averageScore: { $avg: '$score' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { averageScore: -1 }
      }
    ]).toArray();

    avgBySubject.forEach(doc => {
      console.log(`   ${doc._id}: ${doc.averageScore.toFixed(2)} балів (${doc.count} студентів)`);
    });

    // 2.2 Фільтрація предметів з середнім балом > 75
    console.log('\n🔍 Фільтрація: предмети з середнім балом > 75:');
    const filteredAvg = await assignments.aggregate([
      {
        $group: {
          _id: '$subject',
          averageScore: { $avg: '$score' }
        }
      },
      {
        $match: { averageScore: { $gt: 75 } }
      },
      {
        $sort: { averageScore: -1 }
      }
    ]).toArray();

    filteredAvg.forEach(doc => {
      console.log(`   ${doc._id}: ${doc.averageScore.toFixed(2)} балів`);
    });

    // ============================================
    // ЗАВДАННЯ 3: Робота з індексами
    // ============================================
    console.log('\n' + '='.repeat(60));
    console.log('ЗАВДАННЯ 3: Робота з індексами');
    console.log('='.repeat(60));

    // Перестворимо колекцію для чистоти експерименту з індексами
    await assignments.deleteMany({});
    await assignments.insertMany([
      { name: 'Олександр', subject: 'Математика', score: 92 },
      { name: 'Марія', subject: 'Фізика', score: 78 },
      { name: 'Андрій', subject: 'Математика', score: 85 },
      { name: 'Анастасія', subject: 'Хімія', score: 88 },
      { name: 'Тарас', subject: 'Фізика', score: 71 },
      { name: 'Аліна', subject: 'Біологія', score: 95 }
    ]);

    // 3.1 Створення унікального індексу для поля name
    console.log('\n🔧 Створення унікального індексу для поля name:');
    await assignments.createIndex({ name: 1 }, { unique: true });
    console.log('   ✅ Унікальний індекс створено');

    // Перевірка індексів
    const indexes = await assignments.indexes();
    console.log('\n📋 Індекси колекції:');
    indexes.forEach(idx => {
      console.log(`   - ${idx.name}: ${JSON.stringify(idx.key)}`);
    });

    // 3.2 Аналіз запиту ДО використання індексу (видаляємо індекс тимчасово)
    console.log('\n📊 Аналіз запиту до створення індексу:');
    await assignments.dropIndex('name_1');
    const explainBefore = await assignments.find({ name: /^A/ }).explain('executionStats');
    console.log(`   Потрібно переглянути документів: ${explainBefore.executionStats.totalDocsExamined}`);
    console.log(`   Час виконання: ${explainBefore.executionStats.executionTimeMillis} мс`);

    // Відтворюємо індекс
    await assignments.createIndex({ name: 1 }, { unique: true });

    // 3.3 Запит пошуку для імен, що починаються на 'A'
    console.log('\n🔍 Запит: імена, що починаються на "А":');
    const namesStartingWithA = await assignments.find({ name: /^А/ }).toArray();
    namesStartingWithA.forEach(doc => {
      console.log(`   - ${doc.name}: ${doc.subject} (${doc.score} балів)`);
    });

    // 3.4 Аналіз запиту ПІСЛЯ використання індексу
    console.log('\n📊 Аналіз запиту після створення індексу:');
    const explainAfter = await assignments.find({ name: /^А/ }).explain('executionStats');
    console.log(`   Потрібно переглянути документів: ${explainAfter.executionStats.totalDocsExamined}`);
    console.log(`   Час виконання: ${explainAfter.executionStats.executionTimeMillis} мс`);

    // Порівняння
    console.log('\n📈 Порівняння ефективності:');
    console.log(`   До індексу: ${explainBefore.executionStats.totalDocsExamined} документів, ${explainBefore.executionStats.executionTimeMillis} мс`);
    console.log(`   Після індексу: ${explainAfter.executionStats.totalDocsExamined} документів, ${explainAfter.executionStats.executionTimeMillis} мс`);

    if (explainAfter.executionStats.totalDocsExamined < explainBefore.executionStats.totalDocsExamined) {
      console.log('   ✅ Індекс значно покращує ефективність запиту!');
    }

    // Фінальний вивід колекції
    console.log('\n' + '='.repeat(60));
    console.log('ФІНАЛЬНИЙ ВИГЛЯД КОЛЕКЦІЇ:');
    console.log('='.repeat(60));
    const allDocs = await assignments.find({}).toArray();
    allDocs.forEach(doc => {
      console.log(`   ${doc.name} - ${doc.subject}: ${doc.score} балів`);
    });

    console.log('\n✅ Всі завдання виконано успішно!');

  } catch (error) {
    console.error('❌ Помилка:', error.message);
  } finally {
    await client.close();
    console.log('\n👋 З\'єднання закрито');
  }
}

main();
