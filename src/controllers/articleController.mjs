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
        total: totalArticles,
        published: publishedArticles,
        draft: totalArticles - publishedArticles,
        views: totalViews[0]?.total || 0
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

export default {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByCategory,
  getCategories,
  getArticleStats
};