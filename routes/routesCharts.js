const express = require('express');
const router = express.Router();

// Define the route for the routes chart page
router.get('/', (req, res) => {
    res.render('routesCharts'); // Ensure 'routesCharts.ejs' is in the views directory
});

module.exports = router;
