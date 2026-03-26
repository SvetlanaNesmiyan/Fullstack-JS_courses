import express from 'express';
import * as articleController from '../controllers/articleController.mjs';
import { checkArticleAccess } from '../middleware/accessControl.mjs';

const router = express.Router();

// Маршрути для роботи зі статтями
// GET /articles - отримати всі статті (з перевіркою прав доступу)
router.get('/', checkArticleAccess, articleController.getAllArticles);

// GET /articles/:articleId - отримати статтю за ID (з перевіркою прав доступу)
router.get('/:articleId', checkArticleAccess, articleController.getArticleById);

// POST /articles - створити нову статтю (з перевіркою прав доступу)
router.post('/', checkArticleAccess, articleController.createArticle);

// PUT /articles/:articleId - оновити статтю (з перевіркою прав доступу)
router.put('/:articleId', checkArticleAccess, articleController.updateArticle);

// DELETE /articles/:articleId - видалити статтю (з перевіркою прав доступу)
router.delete('/:articleId', checkArticleAccess, articleController.deleteArticle);

export default router;