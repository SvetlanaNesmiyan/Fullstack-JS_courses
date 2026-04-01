/**
 * Контролер для роботи зі статтями (EJS шаблони)
 * @module controllers/articleController
 */

import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import Article from '../models/Article.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Отримати всі опубліковані статті
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function getAllArticles(req, res) {
  try {
    // Отримуємо статті з MongoDB
    const articles = await Article.getPublished();
    
    const templatePath = path.join(__dirname, '../views/ejs/articles.ejs');
    const template = await ejs.renderFile(templatePath, { 
      title: 'Статті',
      articles,
      isAuthenticated: req.isAuthenticated ? req.isAuthenticated() : false
    });
    
    const layoutPath = path.join(__dirname, '../views/ejs/layout.ejs');
    const html = await ejs.renderFile(layoutPath, {
      title: 'Статті',
      body: template,
      user: req.user || null
    });
    
    res.send(html);
  } catch (error) {
    console.error('Помилка отримання статей:', error);
    res.status(500).send('Помилка сервера при отриманні статей');
  }
}

/**
 * Отримати статтю за ID
 * @param {Object} req - Express request object з params.articleId
 * @param {Object} res - Express response object
 */
export async function getArticleById(req, res) {
  try {
    const articleId = req.params.articleId;
    
    // Знаходимо статтю в MongoDB
    const article = await Article.findById(articleId).populate('author', 'username email');
    
    if (!article) {
      res.status(404).send('Статтю не знайдено');
      return;
    }
    
    // Збільшуємо лічильник переглядів
    await article.incrementViews();
    
    const templatePath = path.join(__dirname, '../views/ejs/articleDetail.ejs');
    const template = await ejs.renderFile(templatePath, { 
      title: article.title,
      article,
      isAuthenticated: req.isAuthenticated ? req.isAuthenticated() : false
    });
    
    const layoutPath = path.join(__dirname, '../views/ejs/layout.ejs');
    const html = await ejs.renderFile(layoutPath, {
      title: article.title,
      body: template,
      user: req.user || null
    });
    
    res.send(html);
  } catch (error) {
    console.error('Помилка отримання статті:', error);
    res.status(500).send('Помилка сервера при отриманні статті');
  }
}

/**
 * Створити нову статтю
 * @param {Object} req - Express request object з body (title, content, tags, etc.)
 * @param {Object} res - Express response object
 */
export async function createArticle(req, res) {
  try {
    const { title, content, excerpt, tags, category, published, imageUrl } = req.body;
    
    // Валідація
    if (!title || !content) {
      res.status(400).send('Заголовок та зміст статті обов\'язкові');
      return;
    }
    
    // Створюємо нову статтю в MongoDB
    const newArticle = new Article({
      title,
      content,
      excerpt,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      category,
      published: published === 'true' || published === true,
      imageUrl,
      author: req.user ? req.user._id : null,
      publishedAt: published ? new Date() : null
    });
    
    await newArticle.save();
    
    res.redirect('/articles');
  } catch (error) {
    console.error('Помилка створення статті:', error);
    res.status(500).send('Помилка сервера при створенні статті');
  }
}

/**
 * Оновити статтю
 * @param {Object} req - Express request object з params.articleId та body
 * @param {Object} res - Express response object
 */
export async function updateArticle(req, res) {
  try {
    const articleId = req.params.articleId;
    const { title, content, excerpt, tags, category, published, imageUrl } = req.body;
    
    // Знаходимо та оновлюємо статтю в MongoDB
    const article = await Article.findById(articleId);
    
    if (!article) {
      res.status(404).send('Статтю не знайдено');
      return;
    }
    
    // Оновлюємо поля
    article.title = title || article.title;
    article.content = content || article.content;
    article.excerpt = excerpt || article.excerpt;
    article.tags = tags ? tags.split(',').map(t => t.trim()) : article.tags;
    article.category = category || article.category;
    article.imageUrl = imageUrl || article.imageUrl;
    
    // Якщо публікуємо вперше
    if (published && !article.published) {
      article.published = true;
      article.publishedAt = new Date();
    } else {
      article.published = published === 'true' || published === true;
    }
    
    await article.save();
    
    res.redirect(`/articles/${articleId}`);
  } catch (error) {
    console.error('Помилка оновлення статті:', error);
    res.status(500).send('Помилка сервера при оновленні статті');
  }
}

/**
 * Видалити статтю
 * @param {Object} req - Express request object з params.articleId
 * @param {Object} res - Express response object
 */
export async function deleteArticle(req, res) {
  try {
    const articleId = req.params.articleId;
    
    // Видаляємо статтю з MongoDB
    const result = await Article.findByIdAndDelete(articleId);
    
    if (!result) {
      res.status(404).send('Статтю не знайдено');
      return;
    }
    
    res.redirect('/articles');
  } catch (error) {
    console.error('Помилка видалення статті:', error);
    res.status(500).send('Помилка сервера при видаленні статті');
  }
}

/**
 * Отримати статті за категорією (API)
 * @param {Object} req - Express request object з params.category
 * @param {Object} res - Express response object
 */
export async function getArticlesByCategory(req, res) {
  try {
    const category = req.params.category;
    const articles = await Article.getByCategory(category);
    
    res.json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (error) {
    console.error('Помилка отримання статей за категорією:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера'
    });
  }
}

/**
 * Отримати всі категорії (API)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function getCategories(req, res) {
  try {
    const categories = ['новини', 'технології', 'навчання', 'проекти', 'інше'];
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Помилка отримання категорій:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера'
    });
  }
}

/**
 * Отримати статистику статей (API)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function getArticleStats(req, res) {
  try {
    const totalArticles = await Article.countDocuments({});
    const publishedArticles = await Article.countDocuments({ published: true });
    const totalViews = await Article.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);
    
    res.json({
      success: true,
      data: {
        totalArticles,
        publishedArticles,
        draftArticles: totalArticles - publishedArticles,
        totalViews: totalViews[0]?.total || 0
      }
    });
  } catch (error) {
    console.error('Помилка отримання статистики:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера'
    });
  }
}

// ================================================
// API CRUD Операції
// ================================================

/**
 * Створити один документ (insertOne)
 * POST /api/articles/create-one
 */
export async function insertOneArticle(req, res) {
  try {
    const { title, content, excerpt, tags, category, published, imageUrl } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Заголовок та зміст статті обов\'язкові'
      });
    }
    
    const newArticle = new Article({
      title,
      content,
      excerpt,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      category,
      published: published || false,
      imageUrl,
      author: req.user ? req.user._id : null,
      publishedAt: published ? new Date() : null
    });
    
    const savedArticle = await newArticle.save();
    
    res.status(201).json({
      success: true,
      message: 'Статтю створено',
      data: savedArticle
    });
  } catch (error) {
    console.error('Помилка створення статті:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера при створенні статті'
    });
  }
}

/**
 * Створити багато документів (insertMany)
 * POST /api/articles/create-many
 */
export async function insertManyArticles(req, res) {
  try {
    const { articles } = req.body;
    
    if (!articles || !Array.isArray(articles) || articles.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Масив статей обов\'язковий'
      });
    }
    
    const articlesWithDefaults = articles.map(article => ({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt || '',
      tags: Array.isArray(article.tags) ? article.tags : [],
      category: article.category || 'інше',
      published: article.published || false,
      imageUrl: article.imageUrl || null,
      author: req.user ? req.user._id : null,
      publishedAt: article.published ? new Date() : null
    }));
    
    const insertedArticles = await Article.insertMany(articlesWithDefaults);
    
    res.status(201).json({
      success: true,
      message: `Створено ${insertedArticles.length} статей`,
      data: insertedArticles,
      insertedCount: insertedArticles.length
    });
  } catch (error) {
    console.error('Помилка масowego створення статей:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера при масовому створенні статей'
    });
  }
}

/**
 * Оновити один документ (updateOne)
 * PUT /api/articles/update-one/:id
 */
export async function updateOneArticle(req, res) {
  try {
    const articleId = req.params.id;
    const { title, content, excerpt, tags, category, published, imageUrl } = req.body;
    
    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (tags) updateData.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());
    if (category) updateData.category = category;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (published !== undefined) {
      updateData.published = published;
      if (published) updateData.publishedAt = new Date();
    }
    
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedArticle) {
      return res.status(404).json({
        success: false,
        message: 'Статтю не знайдено'
      });
    }
    
    res.json({
      success: true,
      message: 'Статтю оновлено',
      data: updatedArticle
    });
  } catch (error) {
    console.error('Помилка оновлення статті:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера при оновленні статті'
    });
  }
}

/**
 * Оновити багато документів (updateMany)
 * PUT /api/articles/update-many
 */
export async function updateManyArticles(req, res) {
  try {
    const { filter, update } = req.body;
    
    if (!filter || !update) {
      return res.status(400).json({
        success: false,
        message: 'Параметри filter та update обов\'язкові'
      });
    }
    
    // Якщо передано published в update, додаємо publishedAt
    const updateData = { ...update };
    if (updateData.published === true) {
      updateData.publishedAt = new Date();
    }
    
    const result = await Article.updateMany(filter, updateData);
    
    res.json({
      success: true,
      message: `Оновлено ${result.modifiedCount} статей`,
      data: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
        acknowledged: result.acknowledged
      }
    });
  } catch (error) {
    console.error('Помилка масового оновлення статей:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера при масовому оновленні статей'
    });
  }
}

/**
 * Замінити один документ (replaceOne)
 * PUT /api/articles/replace-one/:id
 */
export async function replaceOneArticle(req, res) {
  try {
    const articleId = req.params.id;
    const { title, content, excerpt, tags, category, published, imageUrl } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Заголовок та зміст статті обов\'язкові'
      });
    }
    
    // Отримуємо існуючий документ
    const existingArticle = await Article.findById(articleId);
    
    if (!existingArticle) {
      return res.status(404).json({
        success: false,
        message: 'Статтю не знайдено'
      });
    }
    
    // Створюємо новий документ для заміни
    const replacementDoc = {
      title,
      content,
      excerpt: excerpt || '',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      category: category || 'інше',
      published: published || false,
      imageUrl: imageUrl || null,
      author: existingArticle.author,
      views: existingArticle.views,
      publishedAt: published ? new Date() : null
    };
    
    // Використовуємо findOneAndReplace
    const replacedArticle = await Article.findOneAndReplace(
      { _id: articleId },
      replacementDoc,
      { new: true }
    );
    
    res.json({
      success: true,
      message: 'Статтю замінено',
      data: replacedArticle
    });
  } catch (error) {
    console.error('Помилка заміни статті:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера при заміні статті'
    });
  }
}

/**
 * Видалити один документ (deleteOne)
 * DELETE /api/articles/delete-one/:id
 */
export async function deleteOneArticle(req, res) {
  try {
    const articleId = req.params.id;
    
    const deletedArticle = await Article.findByIdAndDelete(articleId);
    
    if (!deletedArticle) {
      return res.status(404).json({
        success: false,
        message: 'Статтю не знайдено'
      });
    }
    
    res.json({
      success: true,
      message: 'Статтю видалено',
      data: deletedArticle
    });
  } catch (error) {
    console.error('Помилка видалення статті:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера при видаленні статті'
    });
  }
}

/**
 * Видалити багато документів (deleteMany)
 * DELETE /api/articles/delete-many
 */
export async function deleteManyArticles(req, res) {
  try {
    const { filter } = req.body;
    
    if (!filter) {
      return res.status(400).json({
        success: false,
        message: 'Параметр filter обов\'язковий'
      });
    }
    
    const result = await Article.deleteMany(filter);
    
    res.json({
      success: true,
      message: `Видалено ${result.deletedCount} статей`,
      data: {
        deletedCount: result.deletedCount,
        acknowledged: result.acknowledged
      }
    });
  } catch (error) {
    console.error('Помилка масового видалення статей:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера при масовому видаленні статей'
    });
  }
}

/**
 * Знайти документи з проекцією (find з projection)
 * GET /api/articles/find
 */
export async function findArticles(req, res) {
  try {
    const { filter, projection, sort, limit, skip } = req.query;
    
    // Парсимо filter та projection з JSON рядків
    let parsedFilter = {};
    let parsedProjection = {};
    let parsedSort = {};
    
    try {
      if (filter) parsedFilter = JSON.parse(filter);
      if (projection) parsedProjection = JSON.parse(projection);
      if (sort) parsedSort = JSON.parse(sort);
    } catch (e) {
      return res.status(400).json({
        success: false,
        message: 'Некоректний формат JSON параметрів'
      });
    }
    
    // Виконуємо запит з проекцією
    let query = Article.find(parsedFilter, parsedProjection);
    
    // Додаємо сортування
    if (Object.keys(parsedSort).length > 0) {
      query = query.sort(parsedSort);
    }
    
    // Додаємо ліміт
    if (limit) {
      query = query.limit(parseInt(limit));
    }
    
    // Додаємо skip (пагінація)
    if (skip) {
      query = query.skip(parseInt(skip));
    }
    
    const articles = await query;
    const total = await Article.countDocuments(parsedFilter);
    
    res.json({
      success: true,
      data: articles,
      pagination: {
        total,
        limit: limit ? parseInt(limit) : total,
        skip: skip ? parseInt(skip) : 0
      }
    });
  } catch (error) {
    console.error('Помилка пошуку статей:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера при пошуку статей'
    });
  }
}

// ================================================
// Курсори - ітерація за допомогою курсора
// ================================================

/**
 * Перебір документів за допомогою курсора
 * GET /articles/api/cursor/iterate
 * 
 * Використовує курсор для ітерації по документах замість
 * завантаження всіх даних в пам'ять. Корисно для великих наборів даних.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function iterateArticlesWithCursor(req, res) {
  try {
    const { batchSize, filter } = req.query;
    
    // Парсимо фільтр з JSON рядка
    let parsedFilter = {};
    try {
      if (filter) parsedFilter = JSON.parse(filter);
    } catch (e) {
      parsedFilter = {};
    }
    
    // Встановлюємо розмір партії
    const size = parseInt(batchSize) || 100;
    
    // Створюємо курсор з налаштуваннями
    const cursor = Article.find(parsedFilter)
      .sort({ createdAt: -1 })
      .batchSize(size)
      .lean()
      .cursor();
    
    // Лічильники для статистики
    let processedCount = 0;
    let totalViewsSum = 0;
    const sampleArticles = [];
    
    // Ітеруємо по курсору партіями
    let article = await cursor.next();
    while (article) {
      processedCount++;
      totalViewsSum += article.views || 0;
      
      // Зберігаємо перші 5 статей для прикладу
      if (sampleArticles.length < 5) {
        sampleArticles.push({
          _id: article._id,
          title: article.title,
          views: article.views,
          category: article.category,
          published: article.published
        });
      }
      
      // Отримуємо наступний документ
      article = await cursor.next();
    }
    
    // Закриваємо курсор
    await cursor.close();
    
    res.json({
      success: true,
      message: `Оброблено ${processedCount} статей за допомогою курсора`,
      data: {
        processedCount,
        totalViewsSum,
        sampleArticles
      },
      info: {
        method: 'Cursor iteration з batchSize: ' + size,
        memoryEfficient: true,
        description: 'Курсор обробляє документи партіями, не завантажуючи всі дані в пам\'ять'
      }
    });
  } catch (error) {
    console.error('Помилка ітерації курсора:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера при ітерації курсора'
    });
  }
}

/**
 * Експорт документів за допомогою курсора (Streaming)
 * GET /articles/api/cursor/export
 * 
 * Використовує streaming для великих наборів даних.
 * Повертає дані порційно замість завантаження всього в пам'ять.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function exportArticlesWithCursor(req, res) {
  try {
    const { filter, limit } = req.query;
    
    // Парсимо фільтр
    let parsedFilter = {};
    try {
      if (filter) parsedFilter = JSON.parse(filter);
    } catch (e) {
      parsedFilter = {};
    }
    
    const maxLimit = parseInt(limit) || 1000;
    
    // Створюємо курсор для streaming
    const cursor = Article.find(parsedFilter)
      .sort({ createdAt: -1 })
      .limit(maxLimit)
      .lean()
      .cursor();
    
    // Ітеруємо по курсору для streaming
    const articles = [];
    for await (const doc of cursor) {
      articles.push(doc);
    }
    
    await cursor.close();
    
    res.json({
      success: true,
      message: `Експортовано ${articles.length} статей`,
      data: articles,
      exportInfo: {
        totalExported: articles.length,
        method: 'cursor.toArray()',
        description: 'Курсор дозволяє ефективно обробляти великі набори даних'
      }
    });
  } catch (error) {
    console.error('Помилка експорту курсора:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера при експорті курсора'
    });
  }
}

// ================================================
// Агрегаційні запити
// ================================================

/**
 * Агрегаційний запит для збору детальної статистики
 * GET /articles/api/aggregate/stats
 * 
 * Використовує MongoDB aggregate pipeline для обчислення
 * складних статистичних даних:
 * - кількість статей по категоріях
 * - середня кількість переглядів
 * - сумарна кількість переглядів
 * - кількість опублікованих/неопублікованих
 * - найпопулярніші теги
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function getAggregatedStats(req, res) {
  try {
    // Агрегаційний пайплайн
    const pipeline = [
      // Етап 1: Основна статистика
      {
        $facet: {
          // Загальна кількість та перегляди
          overview: [
            {
              $group: {
                _id: null,
                totalArticles: { $sum: 1 },
                totalViews: { $sum: '$views' },
                avgViews: { $avg: '$views' },
                maxViews: { $max: '$views' },
                minViews: { $min: '$views' }
              }
            },
            {
              $project: {
                _id: 0,
                totalArticles: 1,
                totalViews: 1,
                avgViews: { $round: ['$avgViews', 2] },
                maxViews: 1,
                minViews: 1
              }
            }
          ],
          // Статистика публікацій
          publishStats: [
            {
              $group: {
                _id: '$published',
                count: { $sum: 1 }
              }
            }
          ],
          // Статистика по категоріях
          categoryStats: [
            {
              $group: {
                _id: '$category',
                count: { $sum: 1 },
                totalViews: { $sum: '$views' },
                avgViews: { $avg: '$views' }
              }
            },
            {
              $sort: { count: -1 }
            },
            {
              $project: {
                category: '$_id',
                _id: 0,
                count: 1,
                totalViews: 1,
                avgViews: { $round: ['$avgViews', 2] }
              }
            }
          ],
          // Статистика по тегах
          tagStats: [
            { $unwind: '$tags' },
            {
              $group: {
                _id: '$tags',
                count: { $sum: 1 },
                totalViews: { $sum: '$views' }
              }
            },
            {
              $sort: { count: -1 }
            },
            {
              $limit: 20
            },
            {
              $project: {
                tag: '$_id',
                _id: 0,
                count: 1,
                totalViews: 1
              }
            }
          ],
          // Статистика по місяцях
          viewsByMonth: [
            {
              $group: {
                _id: {
                  year: { $year: '$createdAt' },
                  month: { $month: '$createdAt' }
                },
                count: { $sum: 1 },
                totalViews: { $sum: '$views' }
              }
            },
            {
              $sort: { '_id.year': -1, '_id.month': -1 }
            },
            {
              $limit: 12
            },
            {
              $project: {
                period: {
                  $concat: [
                    { $toString: '$_id.year' },
                    '-',
                    {
                      $cond: [
                        { $lt: ['$_id.month', 10] },
                        { $concat: ['0', { $toString: '$_id.month' }] },
                        { $toString: '$_id.month' }
                      ]
                    }
                  ]
                },
                _id: 0,
                count: 1,
                totalViews: 1
              }
            }
          ]
        }
      }
    ];
    
    // Виконуємо агрегацію
    const result = await Article.aggregate(pipeline);
    
    // Обробляємо результат
    const overview = result[0].overview[0] || {
      totalArticles: 0,
      totalViews: 0,
      avgViews: 0,
      maxViews: 0,
      minViews: 0
    };
    
    const publishStats = result[0].publishStats.reduce((acc, item) => {
      if (item._id === true) {
        acc.published = item.count;
      } else {
        acc.draft = item.count;
      }
      return acc;
    }, { published: 0, draft: 0 });
    
    res.json({
      success: true,
      message: 'Агрегаційна статистика зібрана успішно',
      data: {
        totalArticles: overview.totalArticles || 0,
        publishedCount: publishStats.published,
        draftCount: publishStats.draft,
        totalViews: overview.totalViews || 0,
        avgViews: overview.avgViews || 0,
        maxViews: overview.maxViews || 0,
        minViews: overview.minViews || 0,
        categoryStats: result[0].categoryStats || [],
        tagStats: result[0].tagStats || [],
        viewsByMonth: result[0].viewsByMonth || []
      },
      info: {
        method: 'MongoDB Aggregation Pipeline',
        stages: [
          '$facet - паралельне виконання кількох агрегацій',
          '$group - групування даних',
          '$unwind - розгортання масивів',
          '$sort - сортування результатів',
          '$project - форматування виводу'
        ],
        description: 'Агрегаційний запит дозволяє зібрати складну статистику за один запит до БД'
      }
    });
  } catch (error) {
    console.error('Помилка агрегації:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка сервера при агрегації'
    });
  }
}

// ================================================
// Експорт
// ================================================

export default {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByCategory,
  getCategories,
  getArticleStats,
  // Курсори
  iterateArticlesWithCursor,
  exportArticlesWithCursor,
  // Агрегаційні запити
  getAggregatedStats
};