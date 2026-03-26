// Контролер для роботи зі статтями

// Мокові дані статей
const articles = [
  { id: 1, title: 'Article 1', content: 'Content of article 1' },
  { id: 2, title: 'Article 2', content: 'Content of article 2' }
];

// Отримати всі статті
export function getAllArticles(req, res) {
  res.send(`Articles: ${JSON.stringify(articles)}`);
}

// Отримати статтю за ID
export function getArticleById(req, res) {
  const articleId = parseInt(req.params.articleId);
  const article = articles.find(a => a.id === articleId);
  
  if (!article) {
    res.status(404).send('Article not found');
    return;
  }
  
  res.send(`Article: ${JSON.stringify(article)}`);
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
  res.status(201).send(`Article created: ${JSON.stringify(newArticle)}`);
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
  res.send(`Article updated: ${JSON.stringify(articles[articleIndex])}`);
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
  res.send('Article deleted');
}