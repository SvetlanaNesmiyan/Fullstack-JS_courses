import express from 'express';
import * as userController from '../controllers/userController.mjs';
import { isAuthenticated } from '../middleware/auth.mjs';
import { validateUserInput } from '../middleware/validation.mjs';

const router = express.Router();

// Маршрути для роботи з користувачами
// GET /users - отримати всіх користувачів (з аутентифікацією)
router.get('/', isAuthenticated, userController.getAllUsers);

// GET /users/:userId - отримати користувача за ID (з аутентифікацією)
router.get('/:userId', isAuthenticated, userController.getUserById);

// POST /users - створити нового користувача (з валідацією)
router.post('/', isAuthenticated, validateUserInput, userController.createUser);

// PUT /users/:userId - оновити користувача (з аутентифікацією)
router.put('/:userId', isAuthenticated, userController.updateUser);

// DELETE /users/:userId - видалити користувача (з аутентифікацією)
router.delete('/:userId', isAuthenticated, userController.deleteUser);

export default router;