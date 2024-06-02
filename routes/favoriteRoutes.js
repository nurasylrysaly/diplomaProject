// routes/favoriteRoutes.js
const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const { requireAuth } = require('../middleware/authMiddleware');

router.post('/add', requireAuth, favoriteController.addFavoriteRoute);
router.post('/remove', requireAuth, favoriteController.removeFavoriteRoute);
router.get('/', requireAuth, favoriteController.getFavoriteRoutes);

module.exports = router;
