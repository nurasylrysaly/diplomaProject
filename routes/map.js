const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', requireAuth, (req, res) => {
    res.render('map'); // Ensure 'map' corresponds to the map.ejs file in your views folder
});

module.exports = router;
