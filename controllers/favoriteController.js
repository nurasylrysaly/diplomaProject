// controllers/favoriteController.js
const FavoriteRoute = require('../models/FavoriteRoute');

module.exports.addFavoriteRoute = async function (req, res) {
    const { route } = req.body;
    console.log(route);
    try {
        const newFavorite = new FavoriteRoute({ user: req.user._id, route: route });
        await newFavorite.save();
        res.status(201).json(newFavorite);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.removeFavoriteRoute = async function (req, res) {
    const { routeId } = req.body;
    try {
        await FavoriteRoute.findOneAndDelete({ user: req.user._id, "route.id": routeId });
        res.status(200).json({ message: 'Route removed from favorites' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.getFavoriteRoutes = async function (req, res) {
    try {
        const favorites = await FavoriteRoute.find({ user: req.user._id });
        res.status(200).json(favorites);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
