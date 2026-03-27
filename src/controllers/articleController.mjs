// Контролер для роботи зі статтями (EJS шаблони)
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Мокові дані статей
const articles = [
  { id: 1, title: 'Перша стаття', content: 'Зміст першої статті' },
  { id: 2, title: 'Друга стаття', content: 'Зміст другої статті' },
  { id: 3, title: 'Третя стаття', content: 'Зміст третьої статті' }
];

// Отримати всі статті
export async function getAllArticles(req, res, next) {
  try {
    const templatePath = path.join(__dirname, '../views/ejs/articles.ejs');
    const template = await ejs.renderFile(templatePath, { 
      title: 'Статті',
      articles 
    });
    
    const layoutPath = path.join(__dirname, '../views/ejs/layout.ejs');
    const html = await ejs.renderFile(layoutPath, {
      title: 'Статті',
      body: template
    });
    
    res.send(html);
  } catch (err) {
    next(err);
  }
}

// Отримати статтю за ID
export async function getArticleById(req, res, next) {
  try {
    const articleId = parseInt(req.params.articleId);
    const article = articles.find(a => a.id === articleId);
    
    if (!article) {
      res.status(404).send('Article not found');
      return;
    }
    
    const templatePath = path.join(__dirname, '../views/ejs/articleDetail.ejs');
    const template = await ejs.renderFile(templatePath, { 
      title: article.title,
      article 
    });
    
    const layoutPath = path.join(__dirname, '../views/ejs/layout.ejs');
    const html = await ejs.renderFile(layoutPath, {
      title: article.title,
      body: template
    });
    
    res.send(html);
  } catch (err) {
    next(err);
  }
}

// Створити нову статтю
export function createArticle(req, res) {
  const { title, content } = req.body;
  const newArticle = {
    id: articles.length + 1,
    title,
    content
  };
  
  articles.push(newArticle);
  res.redirect('/articles');
}

// Оновити статтю
export function updateArticle(req, res) {
  const articleId = parseInt(req.params.articleId);
  const articleIndex = articles.findIndex(a => a.id === articleId);
  
  if (articleIndex === -1) {
    res.status(404).send('Article not found');
    return;
  }
  
  const { title, content } = req.body;
  articles[articleIndex] = { ...articles[articleIndex], title, content };
  res.redirect(`/articles/${articleId}`);
}

// Видалити статтю
export function deleteArticle(req, res) {
  const articleId = parseInt(req.params.articleId);
  const articleIndex = articles.findIndex(a => a.id === articleId);
  
  if (articleIndex === -1) {
    res.status(404).send('Article not found');
    return;
  }
  
  articles.splice(articleIndex, 1);
  res.redirect('/articles');
}