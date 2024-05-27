const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => res.render('route56'));

module.exports = router;