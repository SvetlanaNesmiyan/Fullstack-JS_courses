import express from 'express';
import * as articleController from '../controllers/articleController.mjs';
import { checkArticleAccess } from '../middleware/accessControl.mjs';

const router = express.Router();

// ================================================
// HTML Маршрути (сторінки з EJS шаблонами)
// ================================================

// GET /articles - отримати всі опубліковані статті
router.get('/', articleController.getAllArticles);

// ================================================
// API Маршрути (JSON відповіді) - мають бути вище /:articleId
// ================================================

// GET /articles/api/categories - отримати список категорій
router.get('/api/categories', articleController.getCategories);

// GET /articles/api/category/:category - отримати статті за категорією
router.get('/api/category/:category', articleController.getArticlesByCategory);

// GET /articles/api/stats - отримати статистику статей
router.get('/api/stats', articleController.getArticleStats);

// ================================================
// CRUD Маршрути для статей
// ================================================

// GET /articles/:articleId - отримати статтю за ID
router.get('/:articleId', articleController.getArticleById);

// POST /articles - створити нову статтю (тільки для автентифікованих)
router.post('/', articleController.createArticle);

// PUT /articles/:articleId - оновити статтю (тільки для автентифікованих)
router.put('/:articleId', articleController.updateArticle);

// DELETE /articles/:articleId - видалити статтю (тільки для автентифікованих)
router.delete('/:articleId', articleController.deleteArticle);

export default router;