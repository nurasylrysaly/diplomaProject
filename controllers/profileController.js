// controllers/profileController.js
const UserModel = require('../models/User');
const FavoriteRoute = require('../models/FavoriteRoute');

module.exports.profile = async function (req, res) {
    try {
        const favoriteRoutes = await FavoriteRoute.find({ user: req.user._id });
        res.render("profile.ejs", { user: req.user, favoriteRoutes });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.getEditProfile = function(req, res){
    res.render("edit.ejs", { user: req.user });
};

module.exports.patchEditProfile = async function (req, res) {
    const query = req.body.userId;

    await UserModel.findOneAndUpdate({ _id: query }, {
        firstName: req.body.newFirstName,
        lastName: req.body.newLastName,
        email: req.body.newEmail,
    }).then(data => {
        //console.log(data);
        res.status(200).render('message', { status: 200, message: "User updated successfully." });
    }).catch(err => {
        res.status(200).render('message', { status: 200, message: err.message });
    });
};

module.exports.deleteEditProfile = async function (req, res) {
    await UserModel.deleteOne({ _id: req.body.userId }).then(data => {
        if (data.deletedCount === 0) {
            res.status(404).render('message', { status: 404, message: "User not found" });
        } else {
            res.status(200).render('message', { status: 200, message: "Your account deleted successfully!" });
        }
    }).catch(err => {
        res.status(500).render('message', { status: 500, message: err.message });
    });
};

module.exports.getOrders = function(req, res){
    res.render("orders.ejs");
};
