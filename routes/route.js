const express = require("express");
const router = express.Router();

router.get('/:number', (req, res) => {
    const routeNumber = req.params.number;
    res.render('route', { routeNumber });
});

module.exports = router;