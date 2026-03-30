/**
 * Модель статті для MongoDB
 * @module models/Article
 */

import mongoose from 'mongoose';

/**
 * Схема статті
 */
const articleSchema = new mongoose.Schema({
  /**
   * Заголовок статті
   * @type {String}
   */
  title: {
    type: String,
    required: [true, 'Заголовок статті обов\'язковий'],
    trim: true,
    maxlength: [200, 'Заголовок не може перевищувати 200 символів']
  },

  /**
   * Зміст статті
   * @type {String}
   */
  content: {
    type: String,
    required: [true, 'Зміст статті обов\'язковий'],
    trim: true
  },

  /**
   * Автор статті (посилання на користувача)
   * @type {mongoose.Schema.Types.ObjectId}
   */
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    default: null
  },

  /**
   * Короткий опис статті
   * @type {String}
   */
  excerpt: {
    type: String,
    trim: true,
    maxlength: [500, 'Опис не може перевищувати 500 символів']
  },

  /**
   * Теги статті
   * @type {Array<String>}
   */
  tags: [{
    type: String,
    trim: true
  }],

  /**
   * Статус публікації
   * @type {Boolean}
   */
  published: {
    type: Boolean,
    default: false
  },

  /**
   * Дата публікації
   * @type {Date}
   */
  publishedAt: {
    type: Date
  },

  /**
   * Кількість переглядів
   * @type {Number}
   */
  views: {
    type: Number,
    default: 0
  },

  /**
   * URL зображення для статті
   * @type {String}
   */
  imageUrl: {
    type: String,
    trim: true
  },

  /**
   * Категорія статті
   * @type {String}
   */
  category: {
    type: String,
    trim: true,
    enum: ['новини', 'технології', 'навчання', 'проекти', 'інше'],
    default: 'інше'
  }
}, {
  // Timestamps автоматично додають createdAt та updatedAt
  timestamps: true
});

/**
 * Індекс для повнотекстового пошуку
 */
articleSchema.index({ title: 'text', content: 'text', excerpt: 'text' });

/**
 * Індекс для сортування за датою
 */
articleSchema.index({ createdAt: -1 });

/**
 * Віртуальна властивість для отримання короткого опису
 */
articleSchema.virtual('shortExcerpt').get(function() {
  if (this.excerpt) {
    return this.excerpt;
  }
  return this.content ? this.content.substring(0, 150) + '...' : '';
});

/**
 * Middleware для встановлення publishedAt при публікації
 */
articleSchema.pre('save', function(next) {
  if (this.isModified('published') && this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

/**
 * Метод екземпляра для збільшення лічильника переглядів
 */
articleSchema.methods.incrementViews = async function() {
  this.views += 1;
  return this.save();
};

/**
 * Статичний метод для отримання опублікованих статей
 */
articleSchema.statics.getPublished = function() {
  return this.find({ published: true }).sort({ publishedAt: -1 });
};

/**
 * Статичний метод для отримання статей за категорією
 */
articleSchema.statics.getByCategory = function(category) {
  return this.find({ published: true, category }).sort({ publishedAt: -1 });
};

const Article = mongoose.model('Article', articleSchema);

export default Article;