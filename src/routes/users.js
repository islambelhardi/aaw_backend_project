const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/auth');

// Route to get a user's profile
router.get('/profile',authMiddleware, userController.getUser);

// Route to update a user's profile
router.patch('/profile',userController.updateUser);

module.exports = router;
