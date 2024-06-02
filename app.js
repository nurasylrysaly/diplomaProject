// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const path = require("path");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const mapRoute = require('./routes/map');
const favoriteRoutes = require('./routes/favoriteRoutes'); // Добавили импорт маршрутов

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated() || req.session.isLoggedIn;
    next();
});

require('dotenv').config();

const keys = require("./config/keys");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.use("/", require("./routes/root"));
app.use("/about", require("./routes/about"));
app.use('/map', require("./routes/map"));
app.use('/routesCharts', require("./routes/routesCharts")); // Ensure this matches the filename exactly
app.use("/products", require("./routes/products"));
app.use("/contact", require("./routes/contact"));
app.use("/users", require("./routes/users"));
app.use("/profile", require("./routes/profile"));
app.use("/auth", require("./routes/auth"));
app.use("/route", require("./routes/route"));

app.use('/favorites', favoriteRoutes); // Добавили использование маршрутов

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
