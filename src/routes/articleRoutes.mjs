import express from 'express';
import * as articleController from '../controllers/articleController.mjs';
import { checkArticleAccess } from '../middleware/accessControl.mjs';

const router = express.Router();

// ================================================
// HTML Маршрути (сторінки з EJS шаблонами)
// ================================================

// GET /articles - отримати всі опубліковані статті
router.get('/', articleController.getAllArticles);

// GET /articles/:articleId - отримати статтю за ID
router.get('/:articleId', articleController.getArticleById);

// POST /articles - створити нову статтю (тільки для автентифікованих)
router.post('/', articleController.createArticle);

// PUT /articles/:articleId - оновити статтю (тільки для автентифікованих)
router.put('/:articleId', articleController.updateArticle);

// DELETE /articles/:articleId - видалити статтю (тільки для автентифікованих)
router.delete('/:articleId', articleController.deleteArticle);

// ================================================
// API Маршрути (JSON відповіді)
// ================================================

// GET /articles/api/categories - отримати список категорій
router.get('/api/categories', articleController.getCategories);

// GET /articles/api/category/:category - отримати статті за категорією
router.get('/api/category/:category', articleController.getArticlesByCategory);

// GET /articles/api/stats - отримати статистику статей
router.get('/api/stats', articleController.getArticleStats);

// ================================================
// API CRUD Маршрути (MongoDB операції)
// ================================================

// --- СТВОРЕННЯ ДАНИХ (Create) ---

/**
 * POST /articles/api/create-one
 * Створити один документ (insertOne)
 * 
 * Запит:
 * {
 *   "title": "Заголовок статті",
 *   "content": "Зміст статті",
 *   "excerpt": "Короткий опис",
 *   "tags": ["тег1", "тег2"],
 *   "category": "технології",
 *   "published": true,
 *   "imageUrl": "https://example.com/image.jpg"
 * }
 * 
 * Відповідь:
 * {
 *   "success": true,
 *   "message": "Статтю створено",
 *   "data": { ... }
 * }
 */
router.post('/api/create-one', articleController.insertOneArticle);

/**
 * POST /articles/api/create-many
 * Створити багато документів (insertMany)
 * 
 * Запит:
 * {
 *   "articles": [
 *     { "title": "...", "content": "...", "category": "..." },
 *     { "title": "...", "content": "...", "category": "..." }
 *   ]
 * }
 * 
 * Відповідь:
 * {
 *   "success": true,
 *   "message": "Створено 2 статті",
 *   "data": [ ... ],
 *   "insertedCount": 2
 * }
 */
router.post('/api/create-many', articleController.insertManyArticles);

// --- ОНОВЛЕННЯ ДАНИХ (Update) ---

/**
 * PUT /articles/api/update-one/:id
 * Оновити один документ (updateOne)
 * 
 * Запит:
 * {
 *   "title": "Новий заголовок",
 *   "content": "Новий зміст",
 *   "published": true
 * }
 * 
 * Відповідь:
 * {
 *   "success": true,
 *   "message": "Статтю оновлено",
 *   "data": { ... }
 * }
 */
router.put('/api/update-one/:id', articleController.updateOneArticle);

/**
 * PUT /articles/api/update-many
 * Оновити багато документів (updateMany)
 * 
 * Запит:
 * {
 *   "filter": { "category": "інше" },
 *   "update": { "published": false }
 * }
 * 
 * Відповідь:
 * {
 *   "success": true,
 *   "message": "Оновлено 5 статей",
 *   "data": {
 *     "matchedCount": 5,
 *     "modifiedCount": 3,
 *     "acknowledged": true
 *   }
 * }
 */
router.put('/api/update-many', articleController.updateManyArticles);

/**
 * PUT /articles/api/replace-one/:id
 * Замінити один документ (replaceOne)
 * Повністю замінює документ (крім _id та author)
 * 
 * Запит:
 * {
 *   "title": "Повністю новий заголовок",
 *   "content": "Повністю новий зміст",
 *   "excerpt": "Новий опис",
 *   "tags": ["новий тег"],
 *   "category": "новини",
 *   "published": true
 * }
 * 
 * Відповідь:
 * {
 *   "success": true,
 *   "message": "Статтю замінено",
 *   "data": { ... }
 * }
 */
router.put('/api/replace-one/:id', articleController.replaceOneArticle);

// --- ВИДАЛЕННЯ ДАНИХ (Delete) ---

/**
 * DELETE /articles/api/delete-one/:id
 * Видалити один документ (deleteOne)
 * 
 * Відповідь:
 * {
 *   "success": true,
 *   "message": "Статтю видалено",
 *   "data": { ... }
 * }
 */
router.delete('/api/delete-one/:id', articleController.deleteOneArticle);

/**
 * DELETE /articles/api/delete-many
 * Видалити багато документів (deleteMany)
 * 
 * Запит:
 * {
 *   "filter": { "published": false, "createdAt": { "$lt": "2024-01-01" } }
 * }
 * 
 * Відповідь:
 * {
 *   "success": true,
 *   "message": "Видалено 10 статей",
 *   "data": {
 *     "deletedCount": 10,
 *     "acknowledged": true
 *   }
 * }
 */
router.delete('/api/delete-many', articleController.deleteManyArticles);

// --- РОЗШИРЕННЯ ЧИТАННЯ (Read) ---

/**
 * GET /articles/api/find
 * Знайти документи з проекцією (find з projection)
 * 
 * Query параметри:
 * - filter: JSON рядок з фільтром (наприклад, {"category": "технології"})
 * - projection: JSON рядок з проекцією (наприклад, {"title": 1, "category": 1})
 * - sort: JSON рядок для сортування (наприклад, {"createdAt": -1})
 * - limit: кількість результатів (число)
 * - skip: кількість для пропуску (пагінація)
 * 
 * Приклад запиту:
 * GET /articles/api/find?filter={"published":true}&projection={"title":1,"category":1}&sort={"createdAt":-1}&limit=10&skip=0
 * 
 * Відповідь:
 * {
 *   "success": true,
 *   "data": [ ... ],
 *   "pagination": {
 *     "total": 100,
 *     "limit": 10,
 *     "skip": 0
 *   }
 * }
 */
router.get('/api/find', articleController.findArticles);

// ================================================
// Курсори та Агрегаційні запити
// ================================================

/**
 * GET /articles/api/cursor/iterate
 * Перебір документів за допомогою курсора
 * 
 * Використовує курсор для ітерації по документах замість
 * завантаження всіх даних в пам'ять. Корисно для великих наборів даних.
 * 
 * Query параметри:
 * - batchSize: розмір партії для обробки (за замовчуванням 100)
 * - filter: JSON рядок з фільтром
 * 
 * Приклад запиту:
 * GET /articles/api/cursor/iterate?batchSize=50&filter={"published":true}
 * 
 * Відповідь:
 * {
 *   "success": true,
 *   "message": "Оброблено N статей за допомогою курсора",
 *   "data": {
 *     "processedCount": 50,
 *     "totalViewsSum": 1250,
 *     "sampleArticles": [ ... ]
 *   }
 * }
 */
router.get('/api/cursor/iterate', articleController.iterateArticlesWithCursor);

/**
 * GET /articles/api/cursor/export
 * Експорт документів за допомогою курсора (Streaming)
 * 
 * Використовує streaming для великих наборів даних.
 * Повертає дані порційно замість завантаження всього в пам'ять.
 * 
 * Query параметри:
 * - filter: JSON рядок з фільтром
 * - limit: максимальна кількість документів
 * 
 * Відповідь: JSON масив з даними
 */
router.get('/api/cursor/export', articleController.exportArticlesWithCursor);

/**
 * GET /articles/api/aggregate/stats
 * Агрегаційний запит для збору статистики
 * 
 * Використовує MongoDB aggregate pipeline для обчислення
 * складних статистичних даних:
 * - кількість статей по категоріях
 * - середня кількість переглядів
 * - сумарна кількість переглядів
 * - кількість опублікованих/неопублікованих
 * - найпопулярніші теги
 * 
 * Відповідь:
 * {
 *   "success": true,
 *   "data": {
 *     "totalArticles": 100,
 *     "publishedCount": 75,
 *     "draftCount": 25,
 *     "totalViews": 5000,
 *     "avgViews": 50,
 *     "categoryStats": [...],
 *     "tagStats": [...],
 *     "viewsByMonth": [...]
 *   }
 * }
 */
router.get('/api/aggregate/stats', articleController.getAggregatedStats);

export default router;