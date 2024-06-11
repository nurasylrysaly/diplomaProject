const express = require("express");
const controller = require("../controllers/authController");
const passport = require("passport");
const {requireAuth} = require("../middleware/authMiddleware");
const router = express.Router();

router.get('/login', controller.getLogin);
router.get('/google', passport.authenticate('google',{ scope: ['profile', 'email'] }));
router.get('/google/profile', passport.authenticate('google', { failureRedirect: '/auth/login' }), controller.getAfterGoogle);
router.post('/login', controller.postLoginJwt);
router.post('/register', controller.postRegisterJwt);
router.post('/logout', requireAuth, controller.postLogout);

router.get('/check', requireAuth, (req, res) => {
    res.status(200).json({ message: 'Authenticated' });
});

module.exports = router;