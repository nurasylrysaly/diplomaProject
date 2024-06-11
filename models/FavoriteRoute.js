// models/FavoriteRoute.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const waypointSchema = new Schema({
    name: String,
    comment: String
});

const routeSchema = new Schema({
    names: [String]
});

const movementSchema = new Schema({
    waypoint: waypointSchema,
    type: String,
    routes: [routeSchema]
});

const favoriteRouteSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    route: { 
        total_walkway_distance: String,
        movements: [movementSchema]
    },
    addedAt: { 
        type: Date, 
        default: Date.now 
    }
});

const FavoriteRoute = mongoose.model('FavoriteRoute', favoriteRouteSchema);
module.exports = FavoriteRoute;
