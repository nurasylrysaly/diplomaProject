const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('map'); // Ensure 'map' corresponds to the map.ejs file in your views folder
});

module.exports = router;
