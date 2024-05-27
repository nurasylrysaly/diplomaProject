const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => res.render('route28'));

module.exports = router;