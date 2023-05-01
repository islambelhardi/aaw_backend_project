const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const authController = require('../controllers/authController');

// Register a new user
router.post('/register', authController.register);

// Login an existing user
router.post('/login', authController.login);

// Authenticate routes using authMiddleware
router.use(authMiddleware);

// Logout current user
// router.post('/logout', authController.logout);

module.exports = router;