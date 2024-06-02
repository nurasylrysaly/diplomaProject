// models/FavoriteRoute.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteRouteSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    route: { type: Object, required: true },
    addedAt: { type: Date, default: Date.now }
});

const FavoriteRoute = mongoose.model('FavoriteRoute', favoriteRouteSchema);
module.exports = FavoriteRoute;
