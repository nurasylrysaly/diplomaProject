const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const path = require("path");
const app = express();

require('dotenv').config();

const keys = require("./config/keys");

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

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.use("/", require("./routes/root"));
app.use("/about", require("./routes/about"));
app.use("/contact", require("./routes/contact"));

app.use('/map', require("./routes/map"));
app.use("/route", require("./routes/route"));
app.use('/favorites', require("./routes/favoriteRoutes"));
app.use("/news", require("./routes/news"));

app.use("/users", require("./routes/users"));
app.use("/profile", require("./routes/profile"));
app.use("/auth", require("./routes/auth"));

module.exports = app;
